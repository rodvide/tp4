import { MongoClient } from "mongodb";

const populate = async () => {
  try {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    client.connect();
    const db = await client.db("tp4");
    const collection = await db.collection("items");

    await collection.insertMany([
      {
        name: "épée courte",
        price: 87,
      },
      {
        name: "épée longue",
        price: 103,
      },
      {
        name: "bouclier",
        price: 231,
      },
      {
        name: "chapeau stylisé",
        price: 14,
      },
      {
        name: "bâton de magie",
        price: 130,
      },
      {
        name: "arc à flèches",
        price: 42,
      },
    ]);
    await client.close();
  } catch (e) {
    console.log(e);
  }
};

populate();
