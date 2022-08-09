const router = require("express").Router()
const { updateTask, getSingleTask, deleteTask, editUsingPut, checking } = require("../controller/tasksCont")
const taskController = require("../controller/tasksCont")



router.route("/tasks").get(taskController.getAlltasks).post(taskController.createTask)

router.route("/:id").get(getSingleTask).delete(deleteTask).put(editUsingPut)

module.exports = router