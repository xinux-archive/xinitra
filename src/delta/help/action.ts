import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.action(`help`, async (ctx: TelegrafContext) => {
  await ctx
    .editMessageText(resource.message, {
      parse_mode: "HTML",
      reply_markup: resource.keyboard,
    })
    .catch(null);
});

middleware(composer);
consoles.module(__filename);
