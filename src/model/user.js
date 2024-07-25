import mongoose from "mongoose";
// Define the schema for the product
const UserSchema = new mongoose.Schema({
  name: String,
  userid: String,
  password: String,
});

// Create a Mongoose model from the schema
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;