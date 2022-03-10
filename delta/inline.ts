import { Composer, Context, Fuse, InlineKeyboard } from "../deps.ts";
import data from "../all.json" assert { type: "json" };
import { Video } from "../types/videos.ts";
const composer = new Composer();

const options = {
  keys: [
    "name",
    "desc",
    "author",
  ],
};
const fuse = new Fuse.default(data, options);

composer.inlineQuery(/(.*)/ig, async (ctx: Context): Promise<any> => {
  if (ctx.inlineQuery?.query) {
    const search = fuse.search(ctx.inlineQuery?.query).map((item: any) =>
      item.item
    ).slice(0, 49);
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
          `✨ <b>Mavzu:</b> ${item.name}` +
          `\n` +
          `🧑‍💻 <b>Muallif:</b> ${item.author}` +
          `\n` +
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
      title: "Qidirishni boshlang!",
      description: "Qidirmoqchi bo'lgan paketingiz nomini yozing!",
      reply_markup: new InlineKeyboard().switchInlineCurrent(
        "Qayta urinib ko'ramizmi?",
        "",
      ),
      input_message_content: {
        message_text: `<b>Salom foydalanuvchi!</b>` +
          `\n` +
          `\n` +
          `Siz inline rejim ishga tushurdingiz. Ushbu qulaylik yordamida siz Xinux ` +
          `Jamiyati yig'gan video darslik va gaydlarni telegram ichidan turib qidirishingiz mumkin. ` +
          `\n` +
          `\n` +
          `<code>@xinitrabot &lt;kalit so'zlari&gt;</code>` +
          `\n` +
          `\n` +
          `yozasiz va natijalar chiqishni boshlaydi...`,
        parse_mode: "HTML",
      },
    }]);
  }
});

export default composer;
