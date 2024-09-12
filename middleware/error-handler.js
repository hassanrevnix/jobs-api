const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Somethinng Went Wrong Please Try Again Later"
  }
  if(err.name === 'ValidationError') {
    CustomError.msg = Object.values(err.errors)
    .map((item)=> item.message)
    .join(' , ')
    CustomError.statusCode = 400
  }
  if(err.name === 'CastError') {
    CustomError.msg = `No item found with id: ${err.value}`
    CustomError.statusCode = 404
  }
  if (err.code && err.code === 11000) {
    CustomError.msg = `Duplicate Value Entered for ${Object.keys(err.keyValue)} Field, Please Choose Another Value`
    CustomError.statusCode = 400
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(CustomError.statusCode).json({ msg: CustomError.msg })
}

module.exports = errorHandlerMiddleware
