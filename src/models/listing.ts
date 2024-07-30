import { z } from "zod";

export const Listing = z.object({
  addedBy: z.string(),
  id: z.string(),
  url: z.string().url(),
  rating: z.number(),
});

export type Listing = z.infer<typeof Listing>;
