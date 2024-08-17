import express from 'express'

import { getAllBlogs, saveBlogData, testFn } from '../controllers/controllers'

const routes = express.Router()

routes.get('/test', testFn)
routes.get('/get-blogs', getAllBlogs)

routes.post('/save-blog', saveBlogData)

export default routes