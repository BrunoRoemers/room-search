import build from "next/dist/build";
import { z, type number } from "zod";

const nullableBoolean = z
  .union([z.boolean(), z.null()])
  .pipe(z.coerce.boolean());

export const ImmowebClassifiedObject = z.object({
  id: z.number(),
  property: z.object({
    netHabitableSurface: z.number(),
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
    building: z.object({
      constructionYear: z.number().nullable(),
    }),
    hasGarden: nullableBoolean,
    hasTerrace: nullableBoolean,
  }),
  transaction: z.object({
    type: z.string(),
    availabilityDate: z.coerce.date(),
    rental: z.object({
      monthlyRentalPrice: z.number(),
      monthlyRentalCosts: z.number(),
    }),
    certificates: z.object({
      epcScore: z.string(),
    }),
  }),
  flags: z.object({
    isUnderOption: z.boolean(),
    isSoldOrRented: z.boolean(),
  }),
  customers: z.array(
    z.object({
      email: z.string().email(),
      phoneNumber: z.string().nullable(),
    })
  ),
});

export type ImmowebClassifiedObject = z.infer<typeof ImmowebClassifiedObject>;
