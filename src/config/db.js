import mongoose from 'mongoose'
const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection established with the database");
    } catch (err) {
        console.log(`Mongoose Error: ${err}`);
    }
};

export default connectDb
