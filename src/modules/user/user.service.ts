import type { RowDataPacket } from "mysql2";
import { pool } from "../../database";
import { NotFoundError } from "elysia";
import type UserModel from "./user.model";

abstract class UserService {
  static async getUserById(id: string) {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, last_name as lastName, first_name as firstName, email FROM user WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw new NotFoundError("user not found");
    }

    return rows[0] as UserModel.UserResponse;
  }
}

export default UserService;
