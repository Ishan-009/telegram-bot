const { Telegraf } = require("telegraf");
require("dotenv").config();
const axios = require("axios");
const bot = new Telegraf(process.env.Bot_Token);

try {
  bot.start((ctx) => ctx.reply("Welcome to Ishan's Bot"));
  bot.command("mockdata", async function (ctx) {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const responseData = JSON.stringify(response.data, null, 2);

      // Check if the responseData is not empty
      if (responseData.trim()) {
        ctx.reply(responseData);
      } else {
        ctx.reply("No data received from the API.");
      }
    } catch (error) {
      console.error("Error fetching mock data:", error.message);
      ctx.reply("Error fetching mock data. Please try again later.");
    }
  });
  bot.help((ctx) =>
    ctx.reply(
      "Send me a sticker or write hi, or write i love you or use /mockdata command"
    )
  );
  bot.on("sticker", (ctx) => ctx.reply("👍")); // Fix the syntax error here
  bot.hears("hi", (ctx) => ctx.reply("Hey there"));

  bot.on("text", function (ctx) {
    if (ctx.update.message.text.toLowerCase() === "i love you") {
      ctx.reply("Love you too bro");
    } else {
      ctx.reply("I dont understand this text");
    }
  });

  bot.launch();
} catch (error) {
  console.error("Error starting the bot:", error.message);
}
