import { Request, Response, NextFunction } from "express"

import BlogData from "../models/blog-content"

export const testFn = async (req: Request, res: Response, next: NextFunction) => {
    res.send('API is working!\n1. [POST] /save-blog/\n2. [GET] /get-blogs')
}

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let blogMetaData = await BlogData.find({}, 'title date')
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
        const { title, content, date } = req.body

        // check if blog with same title exists
        let blogWithSameTitle = await BlogData.findOne({ title })
        if (blogWithSameTitle) {
            return res.status(409).json({ message: 'ERR', cause: 'Blog with same title exists' })
        }

        // save new blog
        const newBlog = new BlogData({
            title,
            content,
            date: date || new Date()
        })

        await newBlog.save()

        return res.status(200).json({ message: 'OK', data: newBlog })

    } catch (err) {
        return res.status(500).json({ message: 'ERR', cause: err })
    }

}