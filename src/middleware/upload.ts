import multer from "multer";
import path from "path";

// setup storage
const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }

})

// setup file filter
const filter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {    
    
    const fileTypes= /jpg|jpeg|png|gif/

    const fileExt = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)

    if(fileExt && mimeType){
        return cb(null, true)
    }else{
        cb(new Error('Invalid File Type\n Accepted Types: jpg, jpeg, png'))
    }

}

// multer middleware
export const upload = multer({
    storage: storage,
    fileFilter: filter,
    limits:{
        fileSize: 1024 * 1024 * 5
    }
})