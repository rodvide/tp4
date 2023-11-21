import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);
const dbName = "tp4";
const collectionName = "adventurers";

const getCollection = async ()=>{
    client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    return collection;
}

const closeConnection = async () =>{
    client.close();
}

const findAll = async () =>{
    try{
        const collection = await getCollection();
        const res = await collection.find({});
        const adventurers = await res.toArray();

        await closeConnection();
        return adventurers;
    }catch(e){
        console.log(e);
        await closeConnection();
    }
}

const findById = async (id) =>{
    try{
        const collection = await getCollection();
        const res = await collection.findOne({ _id: new ObjectId(id) });
        
        return res;
    }catch(e){
        throw e;
    }finally{
        await closeConnection();
    }
}

const findByName = async (name) =>{
    try{
        const collection = await getCollection();
        const res = await collection.findOne({ name: name });

        return res;
    }catch(e){
        throw e;
    }finally{
        await closeConnection();
    }
}

const add = async (adventurer) =>{
    try{
        const collection = await getCollection();
        await collection.insertOne(adventurer);
        await closeConnection();
    }catch(e){
        console.log(e);
        await closeConnection();
    }
}

const updateById = async (id, adventurer) =>{
    try{
        const collection = await getCollection();
        let updatedItems = await collection.updateOne(
            {_id:new ObjectId(id)},
            {$set:adventurer}
        ) ;
        if(updatedItems.matchedCount==0) throw new Error("Document not found");
        //return deletedItems;
    }catch(e){
        throw e;
    }finally{
        await closeConnection();
    }
}

export default{
    findAll,
    add,
    findById,
    findByName,
    updateById
}