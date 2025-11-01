import z from "zod";

const appConfig = z.object({
  PORT: z.number().default(3000),
  HOST: z.string().default("0.0.0.0"),
  DATABASE_URL: z.string().optional(),
  LOG_LEVEL: z.string().default("info"),
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
