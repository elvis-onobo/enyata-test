import 'express-async-errors'
import app from './app'
import db from './config/db'

const PORT = 4000
// connect to database
db()

app.listen(PORT, () => {
 console.log(`App listening on port ${PORT}`)
})