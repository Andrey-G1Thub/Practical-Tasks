import type { Note } from '../../shared/note_types'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import chalk from 'chalk'


const dbPath = path.resolve(__dirname, '../../../db.json')

export async function getNotes(): Promise<Note[]> {
  const data = await readFile(dbPath, 'utf-8')
  const notes: unknown = JSON.parse(data)

  return Array.isArray(notes) ? (notes as Note[]) : []
}

export async function saveNotes(notes: Note[]): Promise<void> {
  await writeFile(dbPath, JSON.stringify(notes, null, 2))
}

export async function addNote(newTitle: string): Promise<Note> {
  const notes = await getNotes()
  const note = {
    id: randomUUID(),
    title: newTitle,
  }
  notes.push(note)
  //   const updatedNotes = [...notes, note];
  // await saveNotes(updatedNotes);
  await saveNotes(notes)
  console.log(chalk.bgGreen('Note was added!'))
  return note
}

export async function updateNote(
  id: string,
  newTitle: string,
): Promise<boolean> {
  const notes = await getNotes()
  const findNote = notes.find((note) => note.id === id)

  if (!findNote) {
    console.log(chalk.yellow(`Note with "${id}" not found`))
    return false
  }
  const updatedNotes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, title: newTitle }
    }
    return note
  })
  await saveNotes(updatedNotes)
  console.log(chalk.yellow(`Note with "${newTitle}" has been edited.`))
  return true
}

export async function deleteNote(id: string): Promise<boolean> {
  const notes = await getNotes()
  const findNote = notes.find((note) => note.id === id)

  if (!findNote) {
    console.log(chalk.yellow(`Note with "${id}" not found`))
    return false
  }

  const filtered = notes.filter((note) => note.id !== id)

  await saveNotes(filtered)
  console.log(chalk.red(`Note with id="${id}" has been removed.`))
  return true
}
