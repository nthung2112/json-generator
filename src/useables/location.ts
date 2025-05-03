import { faker } from "@faker-js/faker";
import { UseableModule } from "./types";

const locationUseables: UseableModule = {
  city: {
    action: () => faker.location.city(),
    group: "Location",
    explanation: "Returns a city",
    usage: "city()",
    example: faker.location.city(),
    type: String,
  },
  country: {
    action: () => faker.location.country(),
    group: "Location",
    explanation: "Returns a country",
    usage: "country()",
    example: faker.location.country(),
    type: String,
  },
  countryCode: {
    action: () => faker.location.countryCode(),
    group: "Location",
    explanation: "Returns a country code",
    usage: "countryCode()",
    example: faker.location.countryCode(),
    type: String,
  },
  county: {
    action: () => faker.location.county(),
    group: "Location",
    explanation: "Returns a county",
    usage: "county()",
    example: faker.location.county(),
    type: String,
  },
  latitude: {
    action: () => faker.location.latitude().toString(),
    group: "Location",
    explanation: "Returns a latitude",
    usage: "latitude()",
    example: faker.location.latitude().toString(),
    type: Number,
  },
  longitude: {
    action: () => faker.location.longitude().toString(),
    group: "Location",
    explanation: "Returns a longitude",
    usage: "longitude()",
    example: faker.location.longitude().toString(),
    type: Number,
  },
  street: {
    action: () => faker.location.street(),
    group: "Location",
    explanation: "Returns a street",
    usage: "street()",
    example: faker.location.street(),
    type: String,
  },
  streetAddress: {
    action: () => faker.location.streetAddress(),
    group: "Location",
    explanation: "Returns a full street address",
    usage: "streetAddress()",
    example: faker.location.streetAddress(),
    type: String,
  },
  secondaryAddress: {
    action: () => faker.location.secondaryAddress(),
    group: "Location",
    explanation: "Returns a secondary address",
    usage: "secondaryAddress()",
    example: faker.location.secondaryAddress(),
    type: String,
  },
  zipCode: {
    action: () => faker.location.zipCode(),
    group: "Location",
    explanation: "Returns a zip code",
    usage: "zipCode()",
    example: faker.location.zipCode(),
    type: String,
  },
};

export default locationUseables;
