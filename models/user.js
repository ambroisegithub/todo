// import mongoose from "mongoose"
// import crypto from "crypto"
// import {v1 : uuidv1} from "uuid"

const mongoose = require('mongoose');
const {v1 : uuidv1} = require('uuid')
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
   
    userType:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:[true,"input valid email"],
        unique:[true,"duplicate email not allowed"]
    },
    encry_password:{
        type:String,
        required:[true,"password field is required"],
   
    },
    salt:String,
},{timestamps:true})
userSchema.virtual("password")
.set(function(password){
this._password = password
this.salt = uuidv1();

this.encry_password = this.securePassword(password)
})
.get(function(){
return this._password
}
)
userSchema.methods={
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    securePassword:function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto.createHmac("sha256",this.salt).update(plainpassword).digest("hex")
        }catch(err){
            return "";
        }
    }
}

 module.exports = mongoose.model("User",userSchema);