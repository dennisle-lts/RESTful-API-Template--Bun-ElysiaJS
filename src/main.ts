import Elysia from "elysia";
import config from "./config";
import { testConnection } from "./database";
import { user } from "./modules/user";
import openapi from "@elysiajs/openapi";
import z from "zod";

const { APP_PORT, APP_HOST } = config;
let app: Elysia | null = null;

async function closeGracefully(signal: string) {
  console.log(`\nReceived ${signal}, closing server gracefully...`);

  if (app) {
    try {
      await app.stop();
      console.log("Server closed successfully");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  } else {
    process.exit(0);
  }
}

async function main() {
  // check database connection
  const isConnected = await testConnection();
  if (!isConnected) {
    process.exit(1);
  }

  try {
    app = new Elysia()
      .use(
        openapi({
          mapJsonSchema: {
            zod: z.toJSONSchema,
          },
          documentation: {
            info: {
              title: "Sample ElysiaJS RESTful API",
              version: "1.0.0",
            },
            components: {
              securitySchemes: {
                bearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },
            tags: [
              {
                name: "Authentication",
                description: "Authentication endpoints",
              },
              { name: "User", description: "User endpoints" },
            ],
          },
        })
      )
      .use(user)
      .get("/", () => "Hello World", { detail: { hide: true } })
      .listen(APP_PORT);
    console.log(`✅ Server is running on http://${APP_HOST}:${APP_PORT}`);
    console.log(
      `✅ OpenAPI document is running on http://${APP_HOST}:${APP_PORT}/openapi`
    );
  } catch (e) {
    console.log(`Exception caught at main(): ${e}`);
    process.exit(1);
  }
}

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at: ", promise, "reason: ", reason);
  process.exit(1);
});

// Register shutdown handlers
process.on("SIGTERM", () => closeGracefully("SIGTERM"));
process.on("SIGINT", () => closeGracefully("SIGINT"));

main();
