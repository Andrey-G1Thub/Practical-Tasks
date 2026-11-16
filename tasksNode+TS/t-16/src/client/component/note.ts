import { Note } from '../../shared/note_types'

export const stuctureNote = (note: Note) => {
  const divIdNote = document.createElement('div')
  divIdNote.className = 'note'
  divIdNote.dataset.id = note.id

  const pEl = document.createElement('p')
  pEl.textContent = note.title

  const buttonNote = document.createElement('button')
  buttonNote.className = 'delete-btn'
  buttonNote.textContent = 'Удалить'

  divIdNote.append(pEl, buttonNote)
  return divIdNote
}
