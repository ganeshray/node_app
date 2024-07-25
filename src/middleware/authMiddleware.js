import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async(req,res,next)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
    if (token === 'undefined' || token === '') {

      res.status(400)
      throw new Error('Token not available')

  }
  else{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = decoded;
    next();

  }
  }
})

export default protect;