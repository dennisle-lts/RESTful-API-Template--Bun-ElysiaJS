import openapi from "@elysiajs/openapi";
import Elysia from "elysia";
import z from "zod";

const openAPIController = new Elysia().use(
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
);

export default openAPIController;
