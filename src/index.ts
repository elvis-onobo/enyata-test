import 'dotenv/config'
import 'express-async-errors'
import app from './app'

const PORT = 4000

app.listen(PORT, () => {
 console.log(`App listening on port ${PORT}`)
})
