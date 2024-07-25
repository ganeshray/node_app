const errorHandler = (err, req, res, next) => {

  const statusCode = res.statusCode != 200 ? res.statusCode : 500
  res.status(statusCode).json({
      status: false,
      message: err.message,
      error: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

export default errorHandler;