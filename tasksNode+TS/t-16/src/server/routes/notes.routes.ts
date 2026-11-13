import { Router } from 'express'
import {
  addNote,
  CreateNoteDto,
  deleteNote,
  getNotes,
  updateNote,
} from '../controllers/notes.controller'

const router = Router()

// Здесь GET-маршрут
router.get('/', async (req, res) => {
  const notes = await getNotes()
  return res.json(notes)
})

router.post<{}, {}, CreateNoteDto>('/', async (req, res) => {
  try {
    const newTitle = req.body.title
    if (typeof newTitle !== 'string' || !newTitle.trim()) {
      return res.status(400).json({
        message: 'Title is required',
      })
    }
    const newNote = await addNote(newTitle)
    res.status(201).json({
      message: 'Note created successfully',
      note: newNote,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: 'Internal server error',
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const title = req.body.title
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        message: 'Title is required',
      })
    }
    const updated = await updateNote(id, title)
    if (updated) {
      res.status(200).json({
        message: 'Note updated successfully',
      })
    } else {
      res.status(404).json({
        message: 'Not Found',
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal server error',
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return res.status(400).json({
        message: 'id Not Found',
      })
    }
    const deleted = await deleteNote(id)
    if (deleted) {
      return res.sendStatus(204)
    }
    return res.status(404).json({
      message: 'Note Not Found',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal server error',
    })
  }
})

export default router
