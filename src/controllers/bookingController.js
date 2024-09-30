import BookingModel from "../models/BookingsModel";

const addNewBooking=async(req,res){
    const { email,phone,hotelId,startDate,endDate,numberOfRooms}= req.body

    if (!email || !phone || !hotelId || !startDate || !endDate || !numberOfRooms) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      try{
        const newBooking=await BookingModel({email,phone,hotelId,startDate,endDate,numberOfRooms}).save()

        if(!newBooking) return res.status(400).send({message:"error booking"});

        return res.status(200).send({message:"Room Booked"});


      }catch(err){
        return res.status(500).send({error:err});
      }

    
    
}