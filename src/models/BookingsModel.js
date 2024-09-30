import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
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
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        // Ensure the endDate is after the startDate
        return this.startDate < v;
      },
      message: props => `End date (${props.value}) should be after start date!`
    }
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

