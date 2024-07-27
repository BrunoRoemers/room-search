import { z } from "zod";
import { ScriptInput } from "./script-input";

export const ApiSubmitInput = ScriptInput.extend({
  url: z.string().url(),
});

export type ApiSubmitInput = z.infer<typeof ApiSubmitInput>;
