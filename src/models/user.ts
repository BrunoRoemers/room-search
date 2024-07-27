import { z } from "zod";

export const User = z.object({
  secret: z.string(),
  name: z.string(),
});

export const emptyUser: User = { name: "", secret: "" };

export type User = z.infer<typeof User>;
