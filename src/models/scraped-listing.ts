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
  phoneNumber: z.string().nullable(),
  email: z.string().email(),
  epcScore: z.string(),
  constructionYear: z.number().nullable(),
  netHabitableSurface: z.number(),
  hasGarden: z.boolean(),
  hasTerrace: z.boolean(),
});

export type ScrapedListing = z.infer<typeof ScrapedListing>;
