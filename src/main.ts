import config from "./config";

const { PORT, HOST } = config;

async function main() {
  try {
    console.log(`✅ Server is running on http://${HOST}:${PORT}`);
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
