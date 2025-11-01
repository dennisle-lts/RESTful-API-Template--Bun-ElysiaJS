import config from "./config";
import { testConnection } from "./database";

const { APP_PORT, APP_HOST } = config;

async function main() {
  // check database connection
  const isConnected = await testConnection();
  if (!isConnected) {
    process.exit(1);
  }

  try {
    console.log(`✅ Server is running on http://${APP_HOST}:${APP_PORT}`);
  } catch (e) {
    console.log(`Exception caught at main(): ${e}`);
    process.exit(1);
  }
}

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at: ", promise, "reason: ", reason);
  process.exit(1);
});

main();
