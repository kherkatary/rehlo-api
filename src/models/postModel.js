import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    cover: {
        type: String
    },
    title: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("posts", postSchema);
