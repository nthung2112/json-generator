import { faker } from "@faker-js/faker";
import { UseableModule } from "./types";

interface ExtendedUseable {
  action: (...args: string[]) => string;
  group: string;
  explanation: string;
  usage: string;
  example: string;
  type?: StringConstructor;
}

const textUseables: Record<string, ExtendedUseable> = {
  words: {
    action: (count: string) => faker.lorem.words(parseInt(count)),
    group: "Text",
    explanation: "Returns words joined by a space",
    usage: "words(count)",
    example: faker.lorem.words(5),
    type: String,
  },
  paragraph: {
    action: (count: string) => faker.lorem.paragraph(parseInt(count)),
    group: "Text",
    explanation: "Returns a paragraph with a set number of sentences",
    usage: "paragraph(count)",
    example: faker.lorem.paragraph(2),
    type: String,
  },
  slug: {
    action: (count: string) => faker.lorem.slug(parseInt(count)),
    group: "Text",
    explanation: "Returns a slug with a set number of words",
    usage: "slug(count)",
    example: faker.lorem.slug(5),
    type: String,
  },
  companyName: {
    action: () => faker.company.name(),
    group: "Text",
    explanation: "Returns a company name",
    usage: "companyName()",
    example: faker.company.name(),
    type: String,
  },
};

export default textUseables as UseableModule;
