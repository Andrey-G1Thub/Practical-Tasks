import { Router } from 'express'
import { getNotes } from '../notes.controller'

const router = Router()

// Здесь GET-маршрут
router.get('/', async (req, res) => {
  const notes = await getNotes()
  return res.json(notes)
})

export default router
