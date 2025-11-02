import z, { email } from "zod";

namespace UserModel {
  export const userResponse = z.object({
    id: z.ulid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
  });

  export type UserResponse = z.infer<typeof userResponse>;
}

export default UserModel;
