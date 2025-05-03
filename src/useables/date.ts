import { faker } from "@faker-js/faker";
import { UseableModule } from "./types";

const dateUseables: UseableModule = {
  timeZone: {
    action: () => faker.location.timeZone(),
    group: "Date",
    explanation: "Returns a timezone",
    usage: "timeZone()",
    example: faker.location.timeZone(),
    type: String,
  },
  date: {
    action: () => faker.date.anytime(),
    group: "Date",
    explanation: "Returns a date",
    usage: "date()",
    example: faker.date.anytime().toJSON(),
    type: Date,
  },
  datePast: {
    action: () => faker.date.past(),
    group: "Date",
    explanation: "Returns a date in the past",
    usage: "datePast()",
    example: faker.date.past().toJSON(),
    type: Date,
  },
  dateFuture: {
    action: () => faker.date.future(),
    group: "Date",
    explanation: "Returns a date in the future",
    usage: "dateFuture()",
    example: faker.date.future().toJSON(),
    type: Date,
  },
  dateRange: {
    action: (min: string, max: string) =>
      faker.date.between({
        from: new Date(min),
        to: new Date(max),
      }),
    group: "Date",
    explanation: "Returns a date between two dates",
    usage: "dateRange(min, max)",
    example: faker.date.anytime().toJSON(),
    type: Date,
  },
};

export default dateUseables;
