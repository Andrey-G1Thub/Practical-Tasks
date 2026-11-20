import type { Note } from '../../shared/note_types'
import { errorMessage } from './error-message'

export const modalNote = (note: Note, noteUpdate: HTMLDivElement) => {
  const modalWindow = document.querySelector('#modal-window')
  if (modalWindow) {
    modalWindow.remove()
  }

  const modalContainer: HTMLDivElement = document.createElement('div')
  modalContainer.className = 'modal-container'
  modalContainer.id = 'modal-window'
  modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
      modalContainer.remove()
    }
  })

  const formNote: HTMLFormElement = document.createElement('form')
  formNote.className = 'modal-note'
  formNote.dataset.id = note.id
  formNote.addEventListener('submit', async (event) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const titleName = form.elements.namedItem('title') as HTMLInputElement
    const newTitle = titleName.value.trim()
    const id = formNote.dataset.id

    if (!newTitle) {
      if (errorMessage) {
        errorMessage.textContent = 'Поле не должно быть пустым'
      }
      return
    }
    if (!id) {
      if (errorMessage) {
        errorMessage.textContent = 'ID заметки отсутствует'
      }
      return
    }

    try {
      const response = await fetch(`/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          title: newTitle,
        }),
      })

      if (!response.ok) {
        if (errorMessage) {
          errorMessage.textContent = 'Ошибка обновления заметки'
        }
        return
      }

      if (errorMessage) {
        errorMessage.textContent = ''
      }
      const titleElement = noteUpdate.querySelector('p')
      if (titleElement) {
        titleElement.textContent = newTitle
      }
      modalContainer.remove()
    } catch (error) {
      if (errorMessage) {
        errorMessage.textContent = 'UPDATE Не удалось связаться с сервером'
      }
    }
  })

  const modalTitleInput: HTMLInputElement = document.createElement('input')
  modalTitleInput.type = 'text'
  modalTitleInput.id = 'modal-title-input'
  modalTitleInput.value = note.title
  modalTitleInput.name = 'title'
  modalTitleInput.required = true

  const cancelBtn: HTMLButtonElement = document.createElement('button')
  cancelBtn.className = 'cansel-btn'
  cancelBtn.textContent = 'Отменить'
  cancelBtn.type = 'button'

  const saveBtn: HTMLButtonElement = document.createElement('button')
  saveBtn.className = 'save-btn'
  saveBtn.type = 'submit'
  saveBtn.textContent = 'Сохранить'

  formNote.append(modalTitleInput, cancelBtn, saveBtn)
  modalContainer.append(formNote)

  document.body.append(modalContainer)
  cancelBtn.addEventListener('click', () => {
    modalContainer.remove()
  })
  return modalContainer
}
