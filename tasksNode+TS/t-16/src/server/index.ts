import chalk from 'chalk'
import express from 'express'
import notesRoutes from './routes/notes.routes'
import path from 'node:path'
import { getNotes } from './controllers/notes.controller'

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, '../../pages'))

// Здесь будут middleware
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../../public')))

// console.log('Views:', path.resolve(__dirname, '../../pages'))
// console.log('Public:', path.resolve(__dirname, '../../public'))
app.get('/', async (req, res) => {
  return res.render('index', {
    title: 't-16',
    notes: await getNotes(),
  })
})
app.use('/notes', notesRoutes)

// Здесь будет запуск сервера
app.listen(PORT, () => {
  console.log(chalk.green(`Server has been started on port ${PORT}...`))
})
