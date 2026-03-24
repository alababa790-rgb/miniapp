const express = require('express');
const app = express();

// IMPORTANT pour Render
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const TOKEN = "8778778149:AAG4I-kGa2YTuW6ymqPseQd4bzSYIgv5uC0";
const CHAT_ID = "8522024483";

app.post('/payer', async (req, res) => {
    try {
        const panier = req.body.panier;

        let message = "🛒 Nouvelle commande:\n\n";

        panier.forEach(p => {
            message += - ${p.nom} : ${p.prix}€\n;
        });

        const total = panier.reduce((acc, p) => acc + p.prix, 0);
        message += \n💰 Total : ${total}€;

        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
});

app.listen(PORT, () => {
    console.log("🚀 Server running on port " + PORT);
});