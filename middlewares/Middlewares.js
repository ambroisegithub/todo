const  jwt  =  require("jsonwebtoken");
const User = require('../models/user')
async function  Authorization (req,res,next){

    try {

//   console.log(req.headers);
let token  =req.headers.authorization;
console.log(token);
    if(token) {
        var decoded = jwt.verify(token, process.env.SECRET);
        const  user  =  await User.findById(decoded.id);
        if(user.userType === "admin"){
            next();
        }
        else{
            return  res.status(401).json({
                message:"The operation are performed by admin"
            })
        }
        
    }
    else {
      return  res.status(401).json({
            status:"failed",
            message :" Not authorized",
        })
    }
}
catch (error){
    return  res.status(400).json({
        message:"Check Your Token IF Is valid"
    })
}

}

module.exports = Authorization;