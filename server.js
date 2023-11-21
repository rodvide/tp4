import express from "express";
import jwt from "jsonwebtoken";

import items from "./domain/items.js";
import adventurers from "./domain/adventurers.js";
import adventurerDB from "./database/adventurerDB.js";

const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/items", async (req, res) => {
    const response = await items.getAllItems();
    res.send(response);
})

app.post("/startAdventure", async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    adventurers.createAdventurer(name, password);
    res.send(name);
})

app.post("/login", async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    try{adventurers.getAdventurerByNameAndPassword(name, password);}
    catch{res.sendStatus(403);}
  
    const token = jwt.sign({name, password}, "sercret");
  
    res.send(token);
})

const authenticate = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
  
    try {
      const payload = await jwt.verify(token, "secret");
      req.userToken = payload;
      next();
    } catch (e) {
      return res.sendStatus(403);
    }
  };

app.get("/inventory", authenticate, async (req, res) => {
    const name = req.userToken.name;

    const adventurerSelected = await adventurerDB.findByName(name);
    const id = await adventurerSelected._id;

    const response = await adventurers.getAdventurerInventoryById(_id);
    res.send(response);
})

app.post("/buy/:itemId",authenticate , async (req, res) => {
    const itemId = req.params.itemId;
    const name = req.userToken.name;

    const adventurerSelected = await adventurerDB.findByName(name);
    const id = await adventurerSelected._id;

    items.buyItem(itemId)
    const response = await items.getitems();
    res.send(response);
})

console.log("server starting");
app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
      }
    else 
        console.log("Error occurred, server can't start", error);
    }
);

