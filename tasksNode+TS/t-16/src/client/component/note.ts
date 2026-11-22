import type { Note } from '../../shared/note_types'

export const structureNote = (note: Note) => {
  const divIdNote = document.createElement('div')
  divIdNote.className = 'note'
  divIdNote.dataset.id = note.id

  const pEl = document.createElement('p')
  pEl.textContent = note.title

  const actions = document.createElement('div')
  actions.className = 'note-actions'

  const updateBtn = document.createElement('button')
  updateBtn.className = 'update-btn'
  updateBtn.textContent = 'Редактировать'

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'delete-btn'
  deleteBtn.textContent = 'Удалить'

  actions.append(updateBtn, deleteBtn)
  divIdNote.append(pEl, actions)
  return divIdNote
}
