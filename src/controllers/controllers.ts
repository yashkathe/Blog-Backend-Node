import { Request, Response, NextFunction } from "express"
import { promisify } from "util"

import BlogData from "../models/blog-content"
import ImageUpload from "../models/image-upload"

import { upload } from "../middleware/upload"

export const testFn = async (req: Request, res: Response, next: NextFunction) => {
    res.send('API is working!\n1. [POST] /save-blog/ \n2. [POST] /upload-image\n3. [GET] /get-blogs \n4. [GET] /get-blog-by-id/:id')
}

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let blogMetaData = await BlogData.find({}, 'title coverImage description date tags')

        return res.status(200).json({ message: 'OK', data: blogMetaData })

    } catch (err) {
        return res.status(500).json({ message: 'ERR', cause: err })
    }

}

export const getBlogById = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let { id } = req.params

        let blog = await BlogData.findById(id)
        return res.status(200).json({ message: 'OK', data: blog })

    } catch (err) {
        return res.status(500).json({ message: 'ERR', cause: err })
    }

}

export const saveBlogData = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // handle image upload
        const uploadSingle = promisify(upload.single('coverImage'))
        await uploadSingle(req, res)

        const imagePath = req.file?.path
        const { title, description, content, tags, date } = req.body

        // check if blog with same title exists
        let blogWithSameTitle = await BlogData.findOne({ title })
        if (blogWithSameTitle) {
            return res.status(409).json({ message: 'ERR', cause: 'Blog with same title exists' })
        }

        // save new blog
        const newBlog = new BlogData({
            title,
            description,
            content,
            tags: tags.trim().split(','),
            coverImage: imagePath,
            date: date || new Date()
        })

        await newBlog.save()

        return res.status(200).json({ message: 'OK', data: newBlog })

    } catch (err) {
        return res.status(500).json({ message: 'ERR', cause: err })
    }

}

export const saveImage = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // handle image upload
        const uploadImage = promisify(upload.single('image'))
        await uploadImage(req, res)

        const imagePath = req.file?.path
        const imageName = req.file?.originalname

        const newImage = new ImageUpload({
            filename: imageName,
            path: imagePath
        })

        await newImage.save()

        return res.status(200).json({ message: 'OK', data: newImage })

    } catch (err) {
        return res.status(500).json({ message: 'ERR', cause: err })
    }

}