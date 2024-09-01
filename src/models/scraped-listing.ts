import { z } from "zod";

export const ScrapedListing = z.object({
  id: z.string(),
  url: z.string().url(),
  address: z.string(),
  rent: z.number(),
  costs: z.number(),
  bedrooms: z.array(
    z.object({
      surfaceArea: z.number().nullable(),
    })
  ),
  bathrooms: z.array(
    z.object({
      surfaceArea: z.number().nullable(),
    })
  ),
  availabilityDate: z.date(),
  isUnderOption: z.boolean(),
  isTaken: z.boolean(),
  phoneNumber: z.string(),
  email: z.string().email(),
});

export type ScrapedListing = z.infer<typeof ScrapedListing>;
