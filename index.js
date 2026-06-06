
require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

app.command("/yellow-help", async ({ ack, say }) => {
    await ack();
    await say("Hi I can do /help, /yellow-ping and yea thats it");
});

app.command("/yellow-ping", async ({ command, ack, say }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await say(`Pong! 🏓 (${latency}ms)`);
});

(async () => {
    await app.start();
    console.log("Bot is running yayy!");
})();