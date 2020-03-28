const Telegraf = require('telegraf');
const { GOOGLE_CLOUD_PROJECT_ID, TELEGRAM_BOT_TOKEN ,GOOGLE_CLOUD_REGION } = process.env;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Welcome to the most silly bot you'll ever see`));
bot.help((ctx) => ctx.reply(`Write anything to me and I'll repeat it :)`));
bot.on('text', (ctx) => ctx.reply(ctx.message.text)); //listen to every text message
bot.on('message', ctx => ctx.reply('Command not recognized')); //avoid timeouts with unsupported commands
bot.telegram.setWebhook(
    `https://${GOOGLE_CLOUD_REGION}-${GOOGLE_CLOUD_PROJECT_ID}.cloudfunctions.net/${process.env.FUNCTION_TARGET}` //FUNCTION_TARGET is reserved Google Cloud Env
);

exports.telegramBotWebhook = (req, res) => {
    bot.handleUpdate(req.body, res);
};