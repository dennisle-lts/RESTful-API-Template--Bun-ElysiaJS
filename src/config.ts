import z from "zod";

const appConfig = z.object({
  APP_PORT: z.string().regex(/^\d+$/, {
    message: "Must be a string containing only digits",
  }),
  APP_HOST: z.string(),
  LOG_LEVEL: z.string().default("info"),
  DATABASE_HOST: z.ipv4(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_CONNECTION_LIMIT: z.string().regex(/^\d+$/, {
    message: "Must be a string containing only digits",
  }),
  METRICS_PREFIX: z.string().default("app_"),
  COOKIE_NAME: z.string().default("session"),
});

export type AppConfig = z.infer<typeof appConfig>;

const validateEnv = (): AppConfig => {
  try {
    return appConfig.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map((err) => `${err.path}: ${err.message}`)
        .join("\n");
      console.error(`Invalid environment variables: \n${missingVars}`);
      process.exit(1);
    }

    console.error(
      "An unknown error occured while validating environment variables"
    );
    process.exit(1);
  }
};

const config = validateEnv();
export default config;
