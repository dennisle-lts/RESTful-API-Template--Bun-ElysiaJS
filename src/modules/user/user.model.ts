import z, { email } from "zod";

export namespace UserModel {
  export const userResponse = z.object({
    id: z.ulid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
  });

  export type UserResponse = z.infer<typeof userResponse>;
}
