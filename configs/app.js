import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import publicationRoutes from '../src/publication/publication.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'

//Configurations
const app = express()
config()
const port = process.env.PORT || 3200

//Configurate Server Express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Routes Declarations
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/publication', publicationRoutes)
app.use('/comment', commentRoutes)

//Build Server
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}