import mongoose from "mongoose";

const blogDataSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
})

const BlogData = mongoose.model('BlogData', blogDataSchema)

export default BlogData