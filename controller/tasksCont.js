const tasks = require("../models/tasks");
const Task = require("../models/tasks");
const asyncWrapper = require("../middlewares/asyncWrapper")

const controller = {
  getAlltasks: asyncWrapper(async (req, res) => {
    
      const allTasks = await Task.find();
      res.status(200).json(allTasks);
  }),

  createTask: async (req, res) => {
    try {
      const { name, completed } = req.body;
      console.log(req.body)
      const newTask = await Task.create({ name, completed });
      res.send(newTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateTask: async(req,res)=>{
    const {id} =  req.params
    const {name, completed} =  req.body
    const updatedTask = await tasks.findByIdAndUpdate(id,{name,completed},{new : true})
    res.status(201).json({updatedTask})
  },

  getSingleTask : asyncWrapper(async(req,res)=>{
    const {id} =  req.params
    const singleTask = await Task.findById(id)
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

//   created this ciontroller just to check the difference between PUT and PATCH in RESTAPIS 
//  put method will overwrite the complet entry while patch modifiies the specific entry only 
//   checking :async(req,res)=>{
//     const {id} = req.params
//     const updatedTask = await Task.findByIdAndUpdate(id, req.body,{new:true, overwrite : true})
//     res.status(201).json({updatedTask})
//   }
};

module.exports = controller;
