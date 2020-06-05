class ErrorController {

  static handleError(err, req,res,next) {
    let {statusCode, message} = err;
    if(!statusCode) {
      statusCode = 500;
    }
    if(!message) {
      message = "Server error"
    }
    res.status(statusCode).json({
      success: false,
      message
    })
  }
}

export default ErrorController