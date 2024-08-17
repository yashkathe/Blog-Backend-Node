import express from 'express'

import { getAllBlogs, getBlogById, saveBlogData, testFn } from '../controllers/controllers'

const routes = express.Router()

routes.get('/test', testFn)
routes.get('/get-blogs', getAllBlogs)
routes.get('/get-blog-by-id/:id', getBlogById)

routes.post('/save-blog', saveBlogData)

export default routes