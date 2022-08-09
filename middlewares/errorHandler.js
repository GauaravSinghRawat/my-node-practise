const errorHandlerMiddleware = (err, req, res, next)=>{
    return res.status(500).json({HEREISTHEMSG : err})
}

module.exports = errorHandlerMiddleware