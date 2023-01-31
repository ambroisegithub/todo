const express = require("express");
const { signup,signin,signout }= require("../controllers/user")
const {check} = require('express-validator')
const router = express.Router()
router.post('/signup',[
    check("name", "Name at least should be at least 3 character").isLength({min:3}),
    check("email", "Invalid Email").isEmail(),
    check("password", "Password at least should be at least 6 character").isLength({min:6}),
],signup);

router.post('/signin',signin)
router.get("/signout",signout),
module.exports= router;