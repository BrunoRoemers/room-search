import { z, type number } from "zod";

export const ImmowebClassifiedObject = z.object({
  id: z.number(),
  property: z.object({
    bedroomCount: z.number(),
    bedrooms: z.array(
      z.object({
        surface: z.number(),
      })
    ),
    bathroomCount: z.number(),
    bathrooms: z.array(
      z.object({
        surface: z.number(),
      })
    ),
    location: z.object({
      locality: z.string(),
      postalCode: z.string(),
      street: z.string(),
      number: z.string(),
    }),
  }),
  transaction: z.object({
    type: z.string(),
    availabilityDate: z.coerce.date(),
    rental: z.object({
      monthlyRentalPrice: z.number(),
      monthlyRentalCosts: z.number(),
    }),
  }),
});

export type ImmowebClassifiedObject = z.infer<typeof ImmowebClassifiedObject>;
