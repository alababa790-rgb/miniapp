from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler

TOKEN = "8664844666:AAEr2yUxp5ET6hkGDcsgtpjGaceMjvVaG-0"

async def start(update, context):
    keyboard = [
        [InlineKeyboardButton("🛒 Ouvrir la boutique", web_app=WebAppInfo(url="https://google.com"))]
    ]

    await update.message.reply_text(
        "Bienvenue sur LP Store 👋",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

app = ApplicationBuilder().token(TOKEN).build()
app.add_handler(CommandHandler("start", start))

print("Bot lancé 🚀")
app.run_polling()