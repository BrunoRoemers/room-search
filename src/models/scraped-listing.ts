import { z } from "zod";

export const ScrapedListing = z.object({
  id: z.string(),
  url: z.string().url(),
});

export type ScrapedListing = z.infer<typeof ScrapedListing>;
