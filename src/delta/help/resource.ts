import { Markup } from "telegraf";

export const message =
  `<b>Mavjud komandalar:</b>` +
  `\n` +
  `\n` +
  `/video - <code>video darsliklar</code>`;

export const keyboard = Markup.inlineKeyboard([
  [Markup.urlButton("Savol va Javoblar", "https://t.me/xinuxuz")],
]);
