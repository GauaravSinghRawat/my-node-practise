const express = require("express")
require("./connection")
const tasksRoutes =  require("./routes/taskRoutes")
const notFound =  require("./middlewares/notFound")
const errorHandlerMiddleware =  require("./middlewares/errorHandler")


const app =  express()

app.use(express.json())

app.use("/api/v1", tasksRoutes)



app.get("/", (req,res)=>{
    res.send("hellow world")
})

//  we have used the middlewares here so that the all routes can have this middleware.
//  puri kahani, yaha humne jo asyncWrapper use kiya h usme catch block me jab error catch hogi toh wo 
// next(error) middleware me ja ra tha, and express doc k hisdab se error handler middleware sabse last me use hota h 
//  isiliye humne app.use(errorhandlermiddleware) ssabse last me use bhi kiya h.
app.use(notFound)
app.use(errorHandlerMiddleware)

app.listen(8000, ()=>console.log("running on port 8000"))    