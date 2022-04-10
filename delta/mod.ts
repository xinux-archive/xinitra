import start from "./start.ts";
import help from "./help.ts";
import inline from "./inline.ts";
import distro from "./distro.ts";
import { Bot } from "../deps.ts";

export default async (bot: Bot) => {
  await bot.use(inline);
  await bot.use(start);
  await bot.use(help);
  await bot.use(distro);
};
