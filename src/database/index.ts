import mysql from "mysql2/promise";
import config from "../config";

// Database configuration
const dbConfig = {
  host: config.DATABASE_HOST,
  user: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: parseInt(config.DATABASE_CONNECTION_LIMIT),
  queueLimit: 100,
};

// Create connection pool
export const pool = mysql.createPool(dbConfig);

// Test connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Database connection failed:", error.message);
    }
    return false;
  }
}
