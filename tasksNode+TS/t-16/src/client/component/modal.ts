import { Note } from '../../shared/note_types'

export const modalNote = (note: Note) => {
  const modalContainer: HTMLDivElement = document.createElement('div')
  modalContainer.className = 'modal-container'
  modalContainer.id = 'modal-window'
  // export const modalNote = () => {
  const formdNote = document.createElement('form')
  formdNote.className = 'modal-note'
  formdNote.dataset.id = note.id

  const modalTitleInput = document.createElement('input')
  modalTitleInput.type = 'text'
  modalTitleInput.id = 'modal-title-input'
  modalTitleInput.value = note.title
  modalTitleInput.name = 'title'
  modalTitleInput.required = true

  const canselBtn = document.createElement('button')
  canselBtn.className = 'cansel-btn'
  canselBtn.textContent = 'Отменить'
  canselBtn.type = 'button'

  const saveBtn = document.createElement('button')
  saveBtn.className = 'save-btn'
  saveBtn.textContent = 'Сохранить'

  formdNote.append(modalTitleInput, canselBtn, saveBtn)
  modalContainer.append(formdNote)

  const bodyEl = document.querySelector('body')
  bodyEl?.append(modalContainer)
  return modalContainer
}
