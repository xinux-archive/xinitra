import { Composer, Context, InlineKeyboard } from "../deps.ts";
import communities from "../distro.json" assert { type: "json" };
import pager from "../utils/pager.ts";

const composer = new Composer();
const ctxMenuText = "<b>Mavjud distributlar havolalari:</b>";

composer.command("distro", async (ctx: Context): Promise<void> => {
  const keyboard = new InlineKeyboard();

  for (const community of pager(1)) {
    keyboard.text(community.name, `distro_${community.callback}`).row();
  }

  if (pager(2).length > 0) {
    keyboard.text(`Next ➡️`, `distro_2`);
  }

  await ctx.reply(ctxMenuText, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

composer.callbackQuery(/^distro_(\d+)$/, async (ctx: Context) => {
  const page = Number(ctx.match![1]);
  const keyboard = new InlineKeyboard();

  for (const community of pager(page)) {
    keyboard.text(community.name, `detail_${page}_${community.callback}`).row();
  }

  if (pager(page - 1).length > 0) {
    keyboard.text(`⬅️ Oldingi`, `distro_${page - 1}`);
  }

  if (pager(page + 1).length > 0) {
    keyboard.text(`Keyingi ➡️`, `distro_${page + 1}`);
  }

  await ctx.editMessageText(ctxMenuText, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

composer.callbackQuery(/^detail_(\d+)_(.*)$/, async (ctx: Context) => {
  const keyboard = new InlineKeyboard();
  const page = ctx.match![1];
  const result = communities.filter((com) => com.callback === ctx.match![2]);

  if (result.length) {
    const data = result[0];

    if (data.telegram) {
      keyboard.url(
        `Telegram`,
        `https://t.me/${data.telegram.replace("@", "")}`,
      );
    }

    if (data.link) {
      keyboard.url(`Web`, data.link);
    }

    keyboard.row().text(`🔙 Orqaga`, `distro_${page}`);

    await ctx.editMessageText(
      `<b>${data.name} distro</b>` +
        `\n` +
        `\n` +
        `<i>${data.about}</i>` +
        `\n` +
        `\n` +
        `<b>Quyidagi havola yordamida sotsial tizimlariga o'ting:</b>`,
      {
        parse_mode: "HTML",
        reply_markup: keyboard,
      },
    );
  } else {
    await ctx.editMessageText(`<b>Ushbu distribut mavjud emas!</b>`, {
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard().text(`🔙 Orqaga`, `distro_${page}`),
    });
  }
});

export default composer;
