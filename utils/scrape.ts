import type { Video } from "../types/videos.ts";
import logger from "./logger.ts";

const output: Video[] = [];
const decoder = new TextDecoder("utf-8");

const scrap = async () => {
  await logger("starting");

  try {
    // Reading all json into one single json
    for await (const dirEntry of Deno.readDir("./data")) {
      await logger("scraping " + dirEntry.name, "warning");
      const data = await Deno.readFile(`./data/${dirEntry.name}`);
      const scrapes: Video[] = JSON.parse(decoder.decode(data));
      scrapes.map((item) => {
        output.push(item);
      });
    }
    await logger("collecting information completed");
  } catch (e) {
    await logger(e.message, "fail");
  }

  await logger("This many courses we have: " + output.length);

  // Writing all information to all.json
  await Deno.writeTextFile("all.json", JSON.stringify(output));
  await logger("information has been written as all.json");
};

await scrap();
