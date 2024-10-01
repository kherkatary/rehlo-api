import BookingModel from "../models/BookingsModel.js";

const addNewBooking=async(req,res)=>{
    const { email,name,phone,hotelId,paidAmount,roomType,startDate,totalDays,numberOfRooms}= req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
  }
  if (!name) {
      return res.status(400).json({ error: 'Name is required' });
  }
  if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
  }
  if (!hotelId) {
      return res.status(400).json({ error: 'Hotel ID is required' });
  }
  if (!startDate) {
      return res.status(400).json({ error: 'Start date is required' });
  }
  if (paidAmount === undefined) { 
      return res.status(400).json({ error: 'Paid amount is required' });
  }
  if (!numberOfRooms) {
      return res.status(400).json({ error: 'Number of rooms is required' });
  }
  if (!totalDays) {
      return res.status(400).json({ error: 'Total days are required' });
  }
  if (!roomType) {
      return res.status(400).json({ error: 'Room type is required' });
  }

      try{
        const newBooking=await BookingModel({email,name,phone,hotelId,paidAmount,roomType,startDate,totalDays,numberOfRooms}).save()

        if(!newBooking) return res.status(400).send({message:"error booking"});

        return res.status(200).send({message:"Room Booked"});


      }catch(err){
        return res.status(500).send({error:err});
      }

    
    
}

const getMyBookings=async (req,res)=>{

  const user=req?.user
  if(!user?.email){
    return res.status(400).send({message:"Couldnt find user or user refernce"})
  }

  try{
    const myBookings=await BookingModel.find({email:user?.email}).populate({path:'hotelId', select:'_id images title'})
  
    if(!myBookings) return res.status(201).send({message:"Couldnt fint any bookings"})
  
    return res.status(200).send({
      message:"Bookings found",
      success:true,
      bookings:myBookings
    })
  }catch(err){
    return res.status(500).send({error:"Internal server error while fetching your bookings"})
  }

}
const editBooking=async(req,res)=>{

}


export {addNewBooking,editBooking, getMyBookings}