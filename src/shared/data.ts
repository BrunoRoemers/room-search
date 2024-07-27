import { z } from "zod";

export const Data = z.object({
  secret: z.string(),
  rating: z.coerce.number(),
});

export type Data = z.infer<typeof Data>;
