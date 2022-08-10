const tasks = require("../models/tasks");
const Task = require("../models/tasks");
const asyncWrapper = require("../middlewares/asyncWrapper")
const {createCustomError} =  require("../errors/customError")

const controller = {
  getAlltasks: asyncWrapper(async (req, res) => {
    
      const allTasks = await Task.find();
      res.status(200).json(allTasks);
  }),

  createTask: asyncWrapper(async (req, res) => {
  
      const { name, completed } = req.body;
      console.log(req.body)
      const newTask = await Task.create({ name, completed });
      res.status(201).send(newTask);
    
  }),

  updateTask: async(req,res)=>{
    const {id} =  req.params
    const {name, completed} =  req.body
    const updatedTask = await tasks.findByIdAndUpdate(id,{name,completed},{new : true})
    res.status(201).json({updatedTask})
  },

  getSingleTask : asyncWrapper(async(req,res, next)=>{
    const {id} =  req.params
    const singleTask = await Task.findById(id)
    if(!singleTask){


      // THIS IS THE ONE WAY FOR ERROR HANDLING FOR 404 NOT FOUND BUT IN THIS CASE WE HAVE TO REPEAT OURSELVES IN EVERY CONTROLLER< SO WE HAVE ANOTHER APPROACH ALSO WHERE WE HAVE USED THE CUSTOM ERROR DERIVED FROM ERROR CLASS OF JAVAASCRIPT.

      //  creatig  here new error derived from javascrpt error class and passing it to the next middleware 
      // errorHandler with the status code and error message.
      // const error = new Error("not found")
      // error.status = 404
      // return next(error)
      // return res.status(404).json({data : "no data found"})

      //  HERE IS THAT SECOPNDF APPROACH FOR CUSTO ERROR HANDLING.
      return next(createCustomError("no task found for your search", 404))
    }
    res.status(200).json({singleTask})
  }),

  deleteTask:async(req,res)=>{
    const {id} =  req.params
    const deletedItem = await Task.findByIdAndDelete(id)
    res.status(201).json({data : "successfully deleted"})
  },

  editUsingPut : async(req,res)=>{
    const {id} = req.params
    const {name,completed} =  req.body
    const newtask = await Task.findByIdAndUpdate(id, {name, completed}, {new: true})
    res.status(201).json({newtask})
  }

//   created this controller just to check the difference between PUT and PATCH in RESTAPIS 
//  put method will overwrite the complet entry while patch modifiies the specific entry only 
//   checking :async(req,res)=>{
//     const {id} = req.params
//     const updatedTask = await Task.findByIdAndUpdate(id, req.body,{new:true, overwrite : true})
//     res.status(201).json({updatedTask})
//   }
};

module.exports = controller;
