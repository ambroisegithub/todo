const Authorization = require("../middlewares/Middlewares");
const express = require("express");
const { Router } = require("express");
const {
  getToDo,
  findoneToDo,
  saveToDo,
  updateToDo,
  deleteToDo,
  patch,
} = require("../controllers/ToDoController");
 const router = express.Router();
router.get("/", getToDo);
router.post("/save", Authorization,saveToDo);
router.post("/update", Authorization,updateToDo);

router.get("/one", Authorization,findoneToDo);
router.post("/delete", Authorization,deleteToDo);

router.patch("/done", Authorization,patch);
module.exports = router;
