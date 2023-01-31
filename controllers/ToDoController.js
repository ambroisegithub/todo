
const ToDoModel = require('../models/ToDoModel');
const user =  require("../models/user")
const   jwt  =  require("jsonwebtoken");

module.exports.getToDo = async(req,res)=>{

    const toDo = await ToDoModel.find();
    res.send(toDo);
}

module.exports.saveToDo = async (req,res)=>{

    const { text } = req.body;
    
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    console.log(decoded);

    const loggedUser =  await   user.findById(decoded.id);
    console.log(loggedUser);

    
    ToDoModel
    .create({text})
    .then((data)=>{
        console.log("added succussfully...");
        console.log(data);
        res.send(data);
    })
   
}


module.exports.updateToDo = async (req,res)=>{
    const {_id,text } =req.body;
    ToDoModel
    .findByIdAndUpdate(_id,{text})
    .then(()=>res.send("updated sucussfully..."))
    .catch((err)=> console.log(err));
}



module.exports.findoneToDo = async (req,res)=>{
    const {_id,text } =req.body;
    ToDoModel
    .findByIdAndUpdate(_id,{text})
    .then(()=>res.send(`${text}`))
    .catch((err)=> console.log(err));
}




module.exports.deleteToDo = async (req,res)=>{
    const {_id} =req.body;
    ToDoModel
    .findByIdAndDelete(_id)
    .then(()=>res.send("delete sucussfully..."))
    .catch((err)=> console.log(err));
}



module.exports.patch = async (req,res)=>{
 const { _id, text } = req.body;
 ToDoModel.findByIdAndUpdate(_id, { text })
   .then(() => res.send("Check The Task if is completed sucussfully..."))
   .catch((err) => console.log(err));

}