import type { RowDataPacket } from "mysql2";
import { pool } from "../../database";
import type { UserModel } from "./user.model";
import { status } from "elysia";

export abstract class UserService {
  static async getUserById(id: string) {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, last_name as lastName, first_name as firstName, email FROM user WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw status(400, "Bad Request");
    }

    return rows[0] as UserModel.UserResponse;
  }
}
