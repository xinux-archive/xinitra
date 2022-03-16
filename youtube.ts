import "./config.ts";
import env from "./config.ts";
import { YoutubeApi } from "./types/youtube.ts";
import {
  green,
  red,
  yellow,
} from "https://deno.land/std@0.128.0/fmt/colors.ts";

const rest = async (channel: string): Promise<YoutubeApi> => {
  const token: string = env["YOUTUBE"];
  const request = await fetch(
    // Get your API Token here:
    // https://console.cloud.google.com/apis/dashboard?project=mad-maids
    `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${channel}&maxResults=200&key=${token}`,
  );
  return await request.json();
};

const chars: { [key: string]: string } = {
  "&#39;": "'",
  "&quot;": "\""

}

const parser = (query: string) => {
  let base = query
  for (const char of Object.keys(chars) ) {
    const reg = new RegExp(char, 'gm')
    base = base?.replace(reg, chars[char])
  }
  return base
}

const json = (request: YoutubeApi) => {
  const mapper = request.items.map((item) => ({
    "name": parser(item?.snippet.title),
    "desc": parser(item?.snippet.description),
    "author": item.snippet.channelTitle,
    "link": `https://www.youtube.com/watch?v=${item.id.videoId}`,
  }));
  return JSON.stringify(mapper, undefined, 2);
};

if (Deno.args.length !== 0) {
  try {
    const channel = Deno.args[0];
    const request = await rest(channel);
    const data = await json(request);
    const defaults: string = request?.items[0].snippet.channelTitle
      .toLowerCase()
      .replace(/\s/g, "");
    const fileName =
      prompt(yellow(`Enter name for file (default: ${defaults}): `)) ||
      defaults;
    await Deno.writeFile(
      `./data/${fileName}.json`,
      new TextEncoder().encode(data),
    );
    console.log(green("Scraping data from API has been completed"));
  } catch (_) {
    console.log(
      red(
        "Probably wrong channel or internet issues, try to change channel id!",
      ),
    );
    Deno.exit(1);
  }
} else {
  console.log(red("Provide a valid channel ID!"));
}
