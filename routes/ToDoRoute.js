// const Authorization = require("../middlewares/Middlewares");
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
router.post("/save", saveToDo);
router.post("/update", updateToDo);

router.get("/one", findoneToDo);
router.post("/delete", deleteToDo);

router.patch("/done", patch);
module.exports = router;
