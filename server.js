const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔑 TON TOKEN
const bot = new TelegramBot("8778778149:AAG4I-kGa2YTuW6ymqPseQd4bzSYIgv5uC0", { polling: true });

// 👉 TON CHAT ID (on va le récupérer après)
let CHAT_ID = null;

// récupérer ton chat id automatiquement
bot.on("message", (msg) => {
  CHAT_ID = msg.chat.id;
  console.log("Chat ID:", CHAT_ID);
});

// servir ton site
app.use(express.static(path.join(__dirname)));

// route paiement
app.get("/payer", (req, res) => {
  if (CHAT_ID) {
    bot.sendMessage(CHAT_ID, "💸 Nouvelle commande reçue !");
  }
  res.send("Commande envoyée !");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});