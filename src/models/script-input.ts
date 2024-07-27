import { z } from "zod";

export const ScriptInput = z.object({
  secret: z.string(),
  rating: z.coerce.number(),
});

export type ScriptInput = z.infer<typeof ScriptInput>;
