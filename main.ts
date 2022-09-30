// For logging
import Logger from "https://deno.land/x/logger@v1.0.2/logger.ts";

// For task sheduling
import { cron } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";

// For parsing args
import args from "https://deno.land/x/args@2.1.1/index.ts";
import {
  EarlyExitFlag,
  PartialOption,
} from "https://deno.land/x/args@2.1.1/flag-types.ts";
import { Text } from "https://deno.land/x/args@2.1.1/value-types.ts";
import { MAIN_COMMAND } from "https://deno.land/x/args@2.1.1/symbols.ts";

// For ntfyer
import { NtfyClient } from "./src/client.ts";
import { config } from "./src/config.ts";
import { Maybe } from "./src/maybe.ts";

// Args
const parser = args
  .describe("Sending various information to your ntfy.sh topic by time")
  .with(EarlyExitFlag("help", {
    alias: ["?"],
    describe: "Show help",
    exit() {
      console.log("USAGE:");
      console.log("  deno run --allow-net main.ts --topic <text>");
      console.log(parser.help());
      return Deno.exit(0);
    },
  }))
  .with(PartialOption("logging", {
    describe: "Enable logging to directory",
    type: Text,
    default: "",
  }))
  .with(PartialOption("topic", {
    describe: "ntfy.sh topic",
    type: Text,
    default: "ntfyer-default-topic",
  }));

// Parse args
const parserRes = parser.parse(Deno.args);

// Check if not main
if (parserRes.tag !== MAIN_COMMAND) {
  console.error(parserRes.error.toString());
  throw Deno.exit(1);
}

// Unknown flags (args)
if (parserRes.remaining().rawFlags().length) {
  console.error("Unknown flags:", ...parserRes.remaining().rawFlags());
  throw Deno.exit(1);
}

// Get topic value
const { topic, logging } = parserRes.value;

// Logging
let logger: Logger | null = null;
if (logging != "") {
  logger = new Logger();
  await logger.initFileLogger(logging, {
    rotate: true,
  });
  logger.disableConsole();
}

// Create ntfy.sh client
const client = new NtfyClient(topic);

// Setup ntfyer modules
config.forEach((mod) => {
  cron(mod.at, () => {
    mod.module.run().then((text) => {
      // Write logs
      logger?.info(mod.title, { text: text });

      // Send message to topic
      Maybe.from(text)
        .map((text) => client.send(text as string, { "Title": mod.title }));
    });
  });
});
