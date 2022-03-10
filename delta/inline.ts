import { Composer, Context, InlineKeyboard } from "../deps.ts";
import terminal from "../data/terminal.json" assert { type: "json" };
const composer = new Composer();

composer.inlineQuery(/(.*)/ig, async (ctx: Context): Promise<any> => {
    if (ctx.inlineQuery?.query) {
        return await ctx.answerInlineQuery(terminal.map(item => ({
            type: "article",
            id: item.name,
            title: item.name,
            description: item.desc,
            reply_markup: new InlineKeyboard().url(`Videoga O'tish`, item.link),
            input_message_content: {
                message_text: 
                    `<b>📃 Topilgan natija...</b>` + 
                    `\n` + 
                    `\n` + 
                    `<b>${item.name}</b>` + 
                    `\n` + 
                    `${item.desc}`,
                parse_mode: "HTML",
            }
        })))
    }
    
    if (!ctx.inlineQuery?.query) {
        return await ctx.answerInlineQuery([{
            type: "article",
            id: "404",
            title: "Qidirilayotgan natija topilmadi...",
            description: "Qidirilayotgan natijani kiriting",
            input_message_content: {
                message_text: "Qidirilayotgan natijani kiriting...",
                parse_mode: "HTML",
            }
        }])
    }
});

export default composer;
