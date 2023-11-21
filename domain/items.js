import itemDB from "../database/itemDB.js";
import adventurerDB from "../database/adventurerDB.js";

const getAllItems = async()=>{
    return await itemDB.findAll()
}

const buyItem = async(itemId, adventurerId)=>{
    try{
        const selectedUser = await adventurerDB.findById(adventurerId);
        const selectedItem = await itemDB.findById(itemId);

        if(selectedUser.inventory.gold < selectedItem.price){
            throw Error("Not enough gold")
        }
        else{
            //cas object deja detenu
            //if(selectedUser.inventory)

            //cas object pas detenu
        }

    }catch(e){
        throw e;
    }
}


export default {
    buyItem,
    getAllItems
}
