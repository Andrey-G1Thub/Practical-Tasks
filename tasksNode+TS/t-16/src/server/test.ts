import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from './controllers/notes.controller'

async function main() {
  // Получаем заметки до добавления и обновления
  const notesBefore = await getNotes()
  console.log('До добавления:', notesBefore)

  // await updateNote('1', 'обновленная')
  await updateNote('3', 'обновленная')

  // Добавляем новую заметку
  await addNote('добавим 1')

  // Получаем заметки после добавления
  const notesAfter = await getNotes()
  console.log('После добавления:', notesAfter)

  await deleteNote('2')
  const notesAfterDelete = await getNotes()
  console.log('После удаления:', notesAfterDelete)
}
main().catch(console.error)
