import { Markup } from "telegraf";

export const message =
  `<b>Salom hurmatli Xinux Jamiyati a'zosi 😏!</b>` +
  `\n` +
  `\n` +
  `Men Xinitra (Ksinitra) Xinux Jamiyati tomonidan yaratilga va darslik material qidirishda yordamlashadigan yordamchiman! ` +
  `\n` +
  `\n` +
  `Mening yordamim bilan siz shu harakatlarni amalga oshirishingiz mumkin:` +
  `\n` +
  `\n` +
  `<code>* Linux ga oid video kurs topish</code>` +
  `\n` +
  `<code>* Linux ga oid pleylist yoki padkastlar qidirish</code>` +
  `\n` +
  `<code>* Linuxga tegishli kerakli informatsiyalar topish</code>` +
  `\n` +
  `\n` +
  `Ishonamanki bir-birimiz bilan chiqishib ketamiz 😄` +
  `\n` +
  `\n` +
  `<i>Komandalar haqida ko'proq ma'lumot olish uchun, pastda keltirilgan tugmachani bosing.</i>`;

export const keyboard = Markup.inlineKeyboard([
  [Markup.callbackButton("Ko'proq ma'lumot ko'rsatish", "help")],
]);
