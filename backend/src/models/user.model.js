import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";

const userSchema=new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        name:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        profileImage:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:[true,'password is requiredd!'],
        },
        role:{
            type:String,
            enum:["admin","user"],
            default:"user"
        },
        phone:{
            type:String,
            required:true
        },
        address:{
            type:String
        }
    },
{timestamps:true})

// hashing password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect=
    async function (password) {
    const isValid=await bcrypt.compare(password,this.password)
    if (!isValid) {
    throw new ApiError(401, "Invalid password");
  }
  return true;
    }
// Generating jwt token
userSchema.methods.generateAccessToken= function () {
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            name:this.name,
            role:this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}

export const User=mongoose.model("User",userSchema)
