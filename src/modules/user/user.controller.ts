import Elysia from "elysia";
import UserService from "./user.service";
import UserModel from "./user.model";

const userController = new Elysia({
  prefix: "/api/user",
  name: "user-plugin",
  tags: ["User"],
})
  .derive(() => {
    // derive is a lifecycle hook that adds new value to the request context right before validation.
    // In this case, I use it to add the hardcoded user id to use with the get endpoint.
    // In a real application, this will be replaced by a Bearer or JWT plugin.
    return {
      userId: "01K7P6G51T85YTZANMWGBNRNV",
    };
  })
  .get(
    "/my-profile",
    async ({ userId }) => {
      const user = await UserService.getUserById(userId);
      return user;
    },
    {
      response: {
        200: UserModel.userResponse,
      },
      detail: {
        summary: "Get user profile",
      },
    }
  );

export default userController;
