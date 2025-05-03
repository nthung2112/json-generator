import { faker } from "@faker-js/faker";
import { UseableModule } from "./types";

const generalUseables: UseableModule = {
  uuid: {
    action: () => faker.string.uuid(),
    group: "General",
    explanation: "Returns a UUID v4",
    usage: "uuid()",
    example: faker.string.uuid(),
    type: String,
  },
  enum: {
    action: (...args: string[]) => {
      return args[Math.floor(Math.random() * args.length)];
    },
    group: "General",
    explanation: "Returns one of the set strings",
    usage: "enum(active, inactive, banned, locked)",
    example: "active",
    type: String,
  },
  boolean: {
    action: () => faker.datatype.boolean(),
    group: "General",
    explanation: "Returns a boolean",
    usage: "boolean()",
    example: faker.datatype.boolean().toString(),
    type: Boolean,
  },
  float: {
    action: (min?: string, max?: string, precision?: string) =>
      faker.number
        .float({
          min: min ? parseFloat(min) : undefined,
          max: max ? parseFloat(max) : undefined,
          precision: precision ? parseInt(precision) : undefined,
        })
        .toString(),
    group: "General",
    explanation: "Returns a float",
    usage: "float(min?, max?, precision?)",
    example: faker.number.float().toString(),
    type: Number,
  },
  floatRange: {
    action: (min?: string, max?: string) =>
      faker.number
        .float({
          min: min ? parseFloat(min) : undefined,
          max: max ? parseFloat(max) : undefined,
        })
        .toString(),
    group: "General",
    explanation: "Returns a float between a range",
    usage: "float(min, max)",
    example: faker.number.float().toString(),
    type: Number,
  },
  int: {
    action: () => faker.number.int().toString(),
    group: "General",
    explanation: "Returns an integer",
    usage: "int()",
    example: faker.number.int().toString(),
    type: Number,
  },
  intRange: {
    action: (min?: string, max?: string) =>
      faker.number
        .int({
          min: min ? parseInt(min) : undefined,
          max: max ? parseInt(max) : undefined,
        })
        .toString(),
    group: "General",
    explanation: "Returns an integer between a range",
    usage: "int(min, max)",
    example: faker.number.int().toString(),
    type: Number,
  },
};

export default generalUseables;
