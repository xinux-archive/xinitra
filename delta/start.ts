import { Composer, Context, InlineKeyboard } from "../deps.ts";

const composer = new Composer();

export const message: string = `<b>Xinitra (Ksinitra) Yordamchisiga Xush Kelibsiz!</b> \n` +
  `\n` +
  `Ushbu bot yordamida siz inline rejimi orqali darsliklar qidirishingiz mumkin! ` +
  `Ushbu bot Xinux va Mad Maids jamiyati tomonidan taqdim etiladi.`;

export const keyboard = new InlineKeyboard()
  .url("Jamiyat", "https://t.me/xinuxuz")
  .url("Web Sahifa", "https://xinux.uz")
  .row()
  .switchInlineCurrent("Qidirishni boshlash", "vim")

composer.command("start", async (ctx: Context): Promise<void> => {
  await ctx.reply(message, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

export default composer;
