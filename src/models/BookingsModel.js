import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name:{
    type:String,
    required:true

  },
  phone: {
    type: String,
    required: true,
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'properties', 
    required: true
  },
  paidAmount:{
    type:Number,
    required:true
  },
  roomType:{
    type:String,
  },
  startDate: {
    type: Date,
    required: true
  },
  totalDays:{
    type:Number,
    required:true
  },
  numberOfRooms: {
    type: Number,
    required: true,
    min: [1, 'At least one room must be booked']
  }
}, {
  timestamps: true 
});

export default mongoose.model('Booking', bookingSchema);

