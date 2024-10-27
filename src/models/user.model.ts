import { model, Schema, Types } from "mongoose";
import { IUser } from "../utils/interface.util";

const userSchema = new Schema<IUser>({
  avatar: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  role: { 
    type: String, 
    default: 'user' 
  },

});

export default model("User", userSchema);
