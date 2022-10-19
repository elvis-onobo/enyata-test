import express, { Application } from 'express'
import { errorMiddleware } from './middleware/errorMiddleware'

import router from './router'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(errorMiddleware)

export default app
