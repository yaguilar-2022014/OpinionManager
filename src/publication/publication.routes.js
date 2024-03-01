'use strict'

import express from "express"
import { publicate, test, updatePublication } from "./publication.controller.js"

const api = express.Router()

api.get('/test', test)
api.post('/publicate', publicate)
api.put('/update/:id', updatePublication)

export default api