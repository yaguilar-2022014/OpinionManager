'use strict'

import { Router } from "express"
import { comment, test, update } from "./comment.controller.js"

const api = Router()

api.get('/test', test)
api.post('/comment', comment)
api.put('/update/:id', update)

export default api