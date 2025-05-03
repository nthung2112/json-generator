import text from "./text";
import internet from "./internet";
import person from "./person";
import general from "./general";
import color from "./color";
import finance from "./finance";
import system from "./system";
import location from "./location";
import date from "./date";
import {
  UseablesMap,
  UseableResult,
  JsonValue,
  isLoopResult,
  isNumberConstructor,
  isBooleanConstructor,
  isDateConstructor,
  ConstructorType,
  LoopResult,
} from "./types";

// Pre-compile regular expressions for better performance
const LOOP_REGEX = /loop\((\d+)(?:,(\d+))?\)/;
const USEABLE_REGEX = /(\w+)(?:\((.*?)\))?/;
const TEMPLATE_REGEX = /{(.*?)}/g;

export const useablesMap: UseablesMap = {
  ...general,
  ...text,
  ...person,
  ...internet,
  ...date,
  ...location,
  ...finance,
  ...system,
  ...color,
};

const parseLoopUseable = (input: string): LoopResult | null => {
  const loopMatch = input.match(LOOP_REGEX);
  if (!loopMatch) return null;

  const min = parseInt(loopMatch[1], 10);
  const max = loopMatch[2] ? parseInt(loopMatch[2], 10) : min;
  const randomLoop = Math.floor(Math.random() * (max - min + 1)) + min;

  return { loop: randomLoop };
};

const parseUseable = (input: string): UseableResult => {
  const useableMatch = input.match(USEABLE_REGEX);
  if (!useableMatch) return input;

  const useableName = useableMatch[1];
  const params = useableMatch[2] ? useableMatch[2].split(",").map((param) => param.trim()) : [];

  const useable = useablesMap[useableName];
  if (!useable) return input;

  return [useable.action(...params), useable.type ?? String] as [any, ConstructorType];
};

export const executeUseable = (input: string): UseableResult => {
  if (input.startsWith("loop(")) {
    const loopResult = parseLoopUseable(input);
    if (loopResult) return loopResult;
  }
  return parseUseable(input);
};

const processValue = (value: any, type: ConstructorType): JsonValue => {
  if (isBooleanConstructor(type)) {
    return value === "true";
  }
  if (isNumberConstructor(type)) {
    return parseFloat(value);
  }
  if (isDateConstructor(type)) {
    return new Date(value).toJSON();
  }
  return value;
};

export const interpretUseables = (inputObject: any): JsonValue => {
  // Handle arrays
  if (Array.isArray(inputObject)) {
    return inputObject.reduce<JsonValue[]>((acc, item, index) => {
      if (typeof item === "string" && item.startsWith("loop")) {
        const result = executeUseable(item);
        if (isLoopResult(result) && index < inputObject.length - 1) {
          const nextItem = inputObject[index + 1];
          acc.push(
            ...Array(result.loop)
              .fill(null)
              .map(() => interpretUseables(nextItem))
          );
          // Skip the next item since we've processed it
          inputObject[index + 1] = null;
        }
      } else if (item !== null) {
        acc.push(interpretUseables(item));
      }
      return acc;
    }, []);
  }

  // Handle objects
  if (typeof inputObject === "object" && inputObject !== null) {
    return Object.entries(inputObject).reduce<{ [key: string]: JsonValue }>((acc, [key, value]) => {
      acc[key] = interpretUseables(value);
      return acc;
    }, {});
  }

  // Handle strings with useables
  if (typeof inputObject === "string") {
    let currentType: ConstructorType = String;
    const replaced = inputObject.replace(TEMPLATE_REGEX, (fullMatch, match) => {
      const useableResult = executeUseable(match);

      if (Array.isArray(useableResult)) {
        const [value, type] = useableResult;
        // Set type only if the entire string is a useable
        if (inputObject === fullMatch) {
          currentType = type;
        }
        return String(value);
      }

      return String(useableResult);
    });

    return processValue(replaced, currentType);
  }

  return inputObject;
};
