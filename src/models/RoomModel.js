import mongoose from 'mongoose'
const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    capacity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    images:[{
        type: String,
        required: true

    }],
    email:{
        type: String,
        required:true
    },
    amenityIds:[{
        type: String,
    }],
    hostedBy:{
        type: String,
        required:true
    },
    organisation:{
        //either public or private
        type:String,
        required:true
    },
    hotelPolicies:[{
        type: String,
        required: true
    }],
    rating:{
        type: Number,
        required:true
    },
    reviews:[{
        rate:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        comment:{
            type:String,
        }

    }],
    currentBookings:[{
        email:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        capacity:{
            type:Number,
            required:true
        },
        startDate:{
            type:Date,
            required:true
        },
        endDate:{
            type:Date,
            required:true
        }
    }]

}, { timestamps: true });

export default mongoose.model("properties", roomSchema);
