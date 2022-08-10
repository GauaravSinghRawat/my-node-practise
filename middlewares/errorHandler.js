const {CustomAPIError} = require("../errors/customError")
const errorHandlerMiddleware = (err, req, res, next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({message : err.message})
    }
    return res.status(500).json({HereIsErrorMessage : {message : err. message, type :err.type}})
}

module.exports = errorHandlerMiddleware