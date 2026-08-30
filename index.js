
require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

function assembleLetterDict(input) {
    input = input.toLowerCase();
    const letterDict = {};
    for (const char of input) {
        if (/[a-z]/.test(char)) {
            if (letterDict[char]) {
                letterDict[char]++;
            }
            else {
                letterDict[char] = 1;
            }
        }
    }
    return letterDict;
}

app.command("/yellow-help", async ({ ack, say }) => {
    await ack();
    await say("Hi I can do /help, /yellow-ping /yellow-count-letters and yea thats it");
});

app.command("/yellow-ping", async ({ command, ack, say }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await say(`Pong! 🏓 (${latency}ms)`);
});

app.command("/yellow-count-letters", async ({ command, ack, say }) => {
    await ack();
    const d = assembleLetterDict(command.text);
    if (Object.keys(d).length === 0) {
        await say("No letters :(");
    } else if (Object.keys(d).length === 26) {
        await say(`All 26 letters are present! yay! most common letter: ${Object.keys(d).reduce((a, b) => d[a] > d[b] ? a : b)}`);
    } else {
        await say(`Letter count: ${Object.keys(d).length}, most common letter: ${Object.keys(d).reduce((a, b) => d[a] > d[b] ? a : b)}`);
    }
});

(async () => {
    console.log("Starting bot...");
    await app.start();
    console.log("Bot is running yayy!");
})();

