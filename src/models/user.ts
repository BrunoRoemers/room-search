import { z } from "zod";

export const User = z.object({
  secret: z.string(),
  name: z.string(),
});

export const emptyUser: User = { name: "", secret: "" };

export type User = z.infer<typeof User>;

export const serializeUsers = (users: User[]): string =>
  btoa(JSON.stringify(users));

export const deserializeUsers = (value: string): User[] => {
  try {
    return z.array(User).parse(JSON.parse(atob(value)));
  } catch (error) {
    throw new Error(`Failed to parse users list`, { cause: error });
  }
};

export const tryDeserializeUsers = (value: string): User[] => {
  try {
    return deserializeUsers(value);
  } catch (error) {
    console.error(error);
    return [];
  }
};