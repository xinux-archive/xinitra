import type { Video } from "./types/videos.ts";

const output: Video[] = [];
const decoder = new TextDecoder("utf-8");

for await (const dirEntry of Deno.readDir("./data")) {
  const data = await Deno.readFile(`./data/${dirEntry.name}`);
  const scrapes: Video[] = JSON.parse(decoder.decode(data));
  scrapes.map((item) => {
    output.push(item);
  });
}

await Deno.writeTextFile("all.json", JSON.stringify(output));
