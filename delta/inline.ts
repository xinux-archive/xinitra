import { Composer, Context, InlineKeyboard, Fuse } from "../deps.ts";
import data from "../all.json" assert { type: "json" };
import {Video} from "../types/videos.ts";
const composer = new Composer();

const options = {
  keys: [
    "name",
    "desc"
  ]
};
const fuse = new Fuse.default(data, options);

composer.inlineQuery(/(.*)/ig, async (ctx: Context): Promise<any> => {
  if (ctx.inlineQuery?.query) {
    const search = fuse.search(ctx.inlineQuery?.query).map((item: any) => item.item)
    return await ctx.answerInlineQuery(search.map((item: Video) => ({
      type: "article",
      id: crypto.randomUUID(),
      title: item.name,
      description: item.desc,
      reply_markup: new InlineKeyboard().url(`Videoga O'tish`, item.link),
      input_message_content: {
        message_text: `<b>📃 Topilgan natija...</b>` +
          `\n` +
          `\n` +
          `<b>${item.name}</b>` +
          `\n` +
          `${item.desc}`,
        parse_mode: "HTML",
      },
    })));
  }

  if (!ctx.inlineQuery?.query) {
    return await ctx.answerInlineQuery([{
      type: "article",
      id: "404",
      title: "Qidirilayotgan natija topilmadi...",
      description: "Qidirilayotgan natijani kiriting",
      reply_markup: new InlineKeyboard().switch,
      input_message_content: {
        message_text: "Qidirilayotgan natijani kiriting...",
        parse_mode: "HTML",
      },
    }]);
  }
});

export default composer;
