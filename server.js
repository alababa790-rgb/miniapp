const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// 🔥 permet d'afficher index.html via localhost
app.use(express.static(__dirname));

let users = {};

// 🔥 PRODUITS (avec types pour filtres)
let products = [
  {id:1, name:"Produit A", price:50, type:"cc"},
  {id:2, name:"Produit B", price:70, type:"log"},
  {id:3, name:"Produit C", price:30, type:"cc"}
];

// 🔹 récupérer produits
app.get("/products", (req,res)=>{
  res.json(products);
});

// 🔹 créer utilisateur
app.post("/user", (req,res)=>{
  const id = req.body.id;

  if(!users[id]){
    users[id] = {
      balance: 100,
      cart: []
    };
  }

  res.json(users[id]);
});

// 🔹 ajouter au panier
app.post("/add", (req,res)=>{
  const {id, product} = req.body;

  if(!users[id]) return res.json({error:true});

  users[id].cart.push(product);

  res.json({ok:true});
});

// 🔹 acheter
app.post("/buy", (req,res)=>{
  const {id} = req.body;
  let user = users[id];

  if(!user) return res.json({success:false});

  let total = user.cart.reduce((a,b)=>a + b.price, 0);

  if(user.balance >= total){
    user.balance -= total;
    user.cart = [];
    res.json({success:true});
  } else {
    res.json({success:false});
  }
});

// 🔹 route debug (optionnel)
app.get("/user/:id", (req,res)=>{
  res.json(users[req.params.id] || {});
});

// 🔥 lancer serveur
app.listen(3000, ()=>{
  console.log("🚀 Server running on http://localhost:3000");
});