import asyncHandler from 'express-async-handler';
import UserModel from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken=(user)=>{
  return jwt.sign(user , process.env.JWT_SECRET, {
    expiresIn: '30d',

})
}

export const registerUser = asyncHandler(async(req,res)=>{
  try {

    const {name,userid,password} = req.body;
    console.info("name",name);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const register = await UserModel.create({
      name,
      userid,
      password:hashedPassword,
    })
    if (!register) {
      throw new Error('query executuion failed')
  }

  res.status(201).json({ message: "User Regstered succesfully" })

  } catch (error) {
    throw new Error(error.message);
  }
});

export const loginUser = asyncHandler(async(req,res)=>{
  try {
    const {userid,password} = req.body;
    const user = await UserModel.findOne({
      userid,
    })

    if( await bcrypt.compare(password, user.password)){
      const token = generateToken({userid:user.userid,name:user.name});

      res.status(200).json({
        name:user.name,
        userid:user.userid,
        token
      })

    }
    else {
      res.status(400)
      throw new Error('Password does not matched')
  }

  } catch (error) {
    throw new Error(error.message)
  }
})

export const checkMiddleWare = asyncHandler(async(req,res)=>{
  try {
    const {userid,name} = req.payload;
    res.status(200).json({userid,name})
  } catch (error) {
    throw new Error(error.message)
  }
})

export const uploadImageTest = asyncHandler(async(req,res)=>{
  try {
    res.status(200).json(req.locals.path)
  } catch (error) {
    throw new Error(error.message)
  }
})


export default {
  registerUser,
}