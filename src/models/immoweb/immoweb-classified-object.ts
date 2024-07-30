import { z, type number } from "zod";

export const ImmowebClassifiedObject = z.object({
  id: z.number(),
  property: z.object({
    bedroomCount: z.number(),
    bathroomCount: z.number(),
    // TODO bedrooms object? bathrooms object?
    location: z.object({
      locality: z.string(),
      postalCode: z.string(),
      street: z.string(),
      number: z.string(),
    }),
  }),
});

export type ImmowebClassifiedObject = z.infer<typeof ImmowebClassifiedObject>;
