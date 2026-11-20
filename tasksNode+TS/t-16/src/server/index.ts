import chalk from 'chalk'
import express from 'express'
import notesRoutes from './routes/notes.routes'
import path from 'node:path'

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, '../../pages'))

//  middleware
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../../public')))

app.get('/', (req, res) => {
  return res.render('index', {
    title: 't-16',
  })
})
app.use('/notes', notesRoutes)

app.listen(PORT, () => {
  console.log(chalk.green(`Server has been started on port ${PORT}...`))
})
