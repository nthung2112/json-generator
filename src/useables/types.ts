export type UseableType = string | number | boolean | Date;

export type ConstructorType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | DateConstructor;

export interface Useable {
  action: (...args: string[]) => UseableType;
  type?: ConstructorType;
  group: string;
  explanation: string;
  usage: string;
  example?: string;
}

export interface UseablesMap {
  [key: string]: Useable;
}

export interface LoopResult {
  loop: number;
}

// Type guards
export const isLoopResult = (value: any): value is LoopResult => {
  return typeof value === "object" && value !== null && "loop" in value;
};

export const isStringConstructor = (value: ConstructorType): value is StringConstructor => {
  return value === String;
};

export const isNumberConstructor = (value: ConstructorType): value is NumberConstructor => {
  return value === Number;
};

export const isBooleanConstructor = (value: ConstructorType): value is BooleanConstructor => {
  return value === Boolean;
};

export const isDateConstructor = (value: ConstructorType): value is DateConstructor => {
  return value === Date;
};

export type UseableResult = [UseableType, ConstructorType] | string | LoopResult;

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type UseableModule = {
  [key: string]: Useable;
};
