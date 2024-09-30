import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  address:{
    type:String,
  },
  name: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: String,
    default: 'https://picsum.photos/200/300', 
  },
  phone:{
    type:String,
  },

  dateOfBirth: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set to current date by default
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});





export default mongoose.model('userProfile', userProfileSchema);

