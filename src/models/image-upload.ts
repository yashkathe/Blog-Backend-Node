import mongoose from "mongoose";

const imageUploads = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
})

const ImageUpload = mongoose.model('ImageUpload', imageUploads)

export default ImageUpload