import { faker } from "@faker-js/faker";
import { UseableModule } from "./types";

const colorUseables: UseableModule = {
  cmyk: {
    action: () => faker.color.cmyk().join(", "),
    group: "Color",
    explanation: "Returns a color as CMYK",
    usage: "cmyk()",
    example: faker.color.cmyk().join(", "),
    type: String,
  },
  hsl: {
    action: () => faker.color.hsl().join(", "),
    group: "Color",
    explanation: "Returns a color as HSL",
    usage: "hsl()",
    example: faker.color.hsl().join(", "),
    type: String,
  },
  hwb: {
    action: () => faker.color.hwb().join(", "),
    group: "Color",
    explanation: "Returns a color as HWB",
    usage: "hwb()",
    example: faker.color.hwb().join(", "),
    type: String,
  },
  lab: {
    action: () => faker.color.lab().join(", "),
    group: "Color",
    explanation: "Returns a color as LAB",
    usage: "lab()",
    example: faker.color.lab().join(", "),
    type: String,
  },
  lch: {
    action: () => faker.color.lch().join(", "),
    group: "Color",
    explanation: "Returns a color as LCH",
    usage: "lch()",
    example: faker.color.lch().join(", "),
    type: String,
  },
  hex: {
    action: () => faker.color.rgb({ format: "hex" }),
    group: "Color",
    explanation: "Returns a color as HEX",
    usage: "hex()",
    example: faker.color.rgb({ format: "hex" }),
    type: String,
  },
  rgb: {
    action: () => faker.color.rgb({ format: "css" }),
    group: "Color",
    explanation: "Returns a color as RGB",
    usage: "rgb()",
    example: faker.color.rgb({ format: "css" }),
    type: String,
  },
  rgba: {
    action: () => faker.color.rgb({ format: "css", includeAlpha: true }),
    group: "Color",
    explanation: "Returns a color as RGBA",
    usage: "rgba()",
    example: faker.color.rgb({ format: "css", includeAlpha: true }),
    type: String,
  },
};

export default colorUseables;
