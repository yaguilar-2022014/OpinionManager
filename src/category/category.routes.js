'use strict'

import express from "express"
import { addCategory, test, updateCategory } from "./category.controller.js"

const api = express.Router()

api.get('/test', test)
api.post('/addCategory', addCategory)
api.put('/updateCategory/:id', updateCategory)

export default api