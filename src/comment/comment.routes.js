'use strict'

import { Router } from "express"
import { comment, test } from "./comment.controller.js"

const api = Router()

api.get('/test', test)
api.post('/comment', comment)

export default api