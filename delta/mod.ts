import start from "./start.ts";
import help from "./help.ts";
import inline from "./inline.ts";
import { Bot } from "../deps.ts";

export default async (bot: Bot) => {
  await bot.use(inline);
  await bot.use(start);
  await bot.use(help);
};
