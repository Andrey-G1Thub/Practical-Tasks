import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

export interface Note {
  id: string
  title: string
}

export type CreateNoteDto = Pick<Note, 'title'> // Pick<Note, 'title'> — встроенный utility type TypeScript. Он создаёт новый тип, выбирая из Note только указанное свойство.

const dbPath = path.resolve(__dirname, '../../db.json')

export async function getNotes(): Promise<Note[]> {
  const data = await readFile(dbPath, 'utf-8')
  const notes: unknown = JSON.parse(data)

  return Array.isArray(notes) ? (notes as Note[]) : []
}

export async function saveNotes(notes: Note[]): Promise<void> {
  await writeFile(dbPath, JSON.stringify(notes, null, 2))
}

export async function addNote(newNotes: string) {
  const notes = await getNotes()
  const note = {
    id: randomUUID(),
    title: newNotes,
  }
  notes.push(note)
  //   const updatedNotes = [...notes, note];
  // await saveNotes(updatedNotes);
  await saveNotes(notes)
  // console.log(chalk.bgGreen('Note was added!'))
}
