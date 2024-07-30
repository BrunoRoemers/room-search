import { z } from "zod";
import { ScrapedListing } from "./scraped-listing";

export const Listing = ScrapedListing.extend({
  addedBy: z.string(),
  rating: z.number(),
});

export type Listing = z.infer<typeof Listing>;
