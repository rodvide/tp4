import adventurerDB from "../database/adventurerDB.js";

const createAdventurer = async(name, password)=>{
    const newAdventurer = {
        name,
        password,
        inventory: {
          gold: 1000, //argent de départ
          items: [],
        },
      };
    await adventurerDB.add(newAdventurer);
}

const getAdventurerByNameAndPassword = async(name, password)=>{
    try{
    const selectedUser = await adventurerDB.findByName(name);
    if(selectedUser.password != password)
        throw Error('Wrong name or password')
    else
        return selectedUser;
    }catch(e){
        throw e;
    }
}

const getAdventurerInventoryById = async(id)=>{
    try{
        return await adventurerDB.findById(id).inventory;
    }catch(e){
        throw e;
    }
}

export default {
    createAdventurer,
    getAdventurerByNameAndPassword,
    getAdventurerInventoryById
}
