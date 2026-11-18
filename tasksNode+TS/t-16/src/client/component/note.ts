import { Note } from '../../shared/note_types'

export const stuctureNote = (note: Note) => {
  const divIdNote = document.createElement('div')
  divIdNote.className = 'note'
  divIdNote.dataset.id = note.id

  const pEl = document.createElement('p')
  pEl.dataset.id = 'pEl-id'
  pEl.textContent = note.title

  const updateBtn = document.createElement('button')
  updateBtn.className = 'update-btn'
  updateBtn.textContent = 'Редактировать'

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'delete-btn'
  deleteBtn.textContent = 'Удалить'

  divIdNote.append(pEl, updateBtn, deleteBtn)
  return divIdNote
}
