import chalk from 'chalk'
import express from 'express'
import notesRoutes from './routes/notes.routes'

const app = express()
const PORT = 3000

// Здесь будут middleware
app.use(express.json())

app.use('/notes', notesRoutes)
// Здесь будет запуск сервера
app.listen(PORT, () => {
  console.log(chalk.green(`Server has been started on port ${PORT}...`))
})
