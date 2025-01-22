const Item = require('../models/itemModel');

//Fetch all Items
exports.getItems = async (req,res)=>{
    try{
        const items = await Item.find();
        res.json(items);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
        
};
//Create new Item
exports.createItems = async (req,res)=>{
    const {name, description, price} = req.body;
    const item = new Item({
        name: name,
        description: description,
        price: price,
    });

    try{
        const newItem = await item.save();
        res.status(201).json(newItem);
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
};
//update an Item completely
exports.updateItem = async(req, res)=>{
    const id = req.params.id;
    const {name,description,price} = req.body;
    try{
        const updatedItem = await Item.findByIdAndUpdate(id,{
            name: name,
            description: description,
            price: price,
        },
        {new: true});// when we write true then Logs the updated document after the update

        if(!updatedItem) return res.status(404).json({message: "Item not found"});

        res.json(updatedItem);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
};
//update an Item Partially
exports.partialUpdateItem = async(req,res) =>{
    try{
        const updatedItem = await Item.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!updatedItem) res.status(404).json({message: 'Item not found'});
        res.json(updatedItem);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
};
// Delete an item
exports.deleteItem = async (req, res) => {
    try {
      const deletedItem = await Item.findByIdAndDelete(req.params.id);
      if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
      res.json({ message: 'Item deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

