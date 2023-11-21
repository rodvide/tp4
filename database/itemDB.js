import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);
const dbName = "tp4";
const collectionName = "items";

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
        const items = await res.toArray();

        await closeConnection();
        return items;
    }catch(e){
        console.log(e);
        await closeConnection();
    }
}

const findById = async (id) =>{
    try{
        const collection = await getCollection();
        const res = await collection.findOne({ _id: new ObjectId(id) });
        
        if(res==null) throw new Error("Document not found");
        return res;
    }catch(e){
        throw e;
    }finally{
        await closeConnection();
    }
}

export default{
    findAll,
    findById
}