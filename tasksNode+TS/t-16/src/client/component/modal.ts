import { Note } from '../../shared/note_types'
import { errorMessage } from './error-message'

export const modalNote = (note: Note) => {
  const modalWindow = document.querySelector('#modal-window')
  if (modalWindow) {
    modalWindow.remove()
  }

  const modalContainer: HTMLDivElement = document.createElement('div')
  modalContainer.className = 'modal-container'
  modalContainer.id = 'modal-window'
  modalContainer.addEventListener('click', (event) => {
    console.log('event.target', event.target)

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
      console.log('Поле не должно быть пустым')
      return
    }
    if (!id) {
      console.log('ID заметки отсутствует')
      return
    }
    console.log(`Вы обновили заметку ${id} с текстом ${newTitle}`)
    try {
      const response = await fetch(`/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          title: newTitle,
        }),
      })
      console.log('result', response)
      if (!response.ok) {
        console.log('Ошибка обновления заметки')
        if (errorMessage) {
          errorMessage.textContent = 'Ошибка обновления заметки'
        }
        return
      }
      const resultUpdate = await response.json()
      if (errorMessage) {
        errorMessage.textContent = ''
      }
      return resultUpdate
    } catch (error) {
      if (errorMessage) {
        errorMessage.textContent = ' UPDATE Не удалось связаться с сервером'
      }
    }
  })

  const modalTitleInput: HTMLInputElement = document.createElement('input')
  modalTitleInput.type = 'text'
  modalTitleInput.id = 'modal-title-input'
  modalTitleInput.value = note.title
  modalTitleInput.name = 'title'
  modalTitleInput.required = true

  const canselBtn: HTMLButtonElement = document.createElement('button')
  canselBtn.className = 'cansel-btn'
  canselBtn.textContent = 'Отменить'
  canselBtn.type = 'button'

  const saveBtn: HTMLButtonElement = document.createElement('button')
  saveBtn.className = 'save-btn'
  saveBtn.textContent = 'Сохранить'

  formNote.append(modalTitleInput, canselBtn, saveBtn)
  modalContainer.append(formNote)

  const bodyEl: HTMLBodyElement | null = document.querySelector('body')
  bodyEl?.append(modalContainer)
  canselBtn.addEventListener('click', () => {
    modalContainer.remove()
  })
  return modalContainer
}
