import { structureNote } from './component/note'
import type { Note } from '../shared/note_types'
import { modalNote } from './component/modal'
import { errorMessage } from './component/error-message'

const noteTitle = document.querySelector<HTMLInputElement>('#note-title')
const notesList = document.querySelector<HTMLDivElement>('#notes-list')
const addNoteForm = document.querySelector<HTMLFormElement>('#add-note-form')

document.addEventListener('DOMContentLoaded', async () => {
  if (!notesList || !errorMessage) {
    return
  }
  try {
    const response = await fetch('/notes', {
      method: 'GET',
    })
    const result = await response.json()

    if (!response.ok) {
      errorMessage.textContent = result.message // Сервер доступен, но вернул HTTP-ошибку
      return
    }

    errorMessage.textContent = ''
    const notes: Note[] = result

    notes.forEach((el) => {
      const note = structureNote(el)

      notesList.append(note)
    })
  } catch (error) {
    errorMessage.textContent = 'GET Не удалось связаться с сервером '
  }
})

notesList?.addEventListener('click', async (event) => {
  const target = event.target

  if (target instanceof Element) {
    const clickedEl = target.closest('.delete-btn')
    if (clickedEl) {
      const note = clickedEl.closest<HTMLDivElement>('.note')

      if (note) {
        const id = note.dataset.id
        if (!id) {
          if (errorMessage) {
            errorMessage.textContent = 'ID заметки отсутствует'
          }
          return
        }

        try {
          const response = await fetch(`/notes/${id}`, {
            method: 'DELETE',
          })

          if (!response.ok) {
            const result = await response.json()

            if (errorMessage) {
              errorMessage.textContent = result.message
            }

            return
          }
          if (errorMessage) {
            errorMessage.textContent = ''
          }

          note.remove()
        } catch (error) {
          if (errorMessage) {
            errorMessage.textContent = ' DELETE Не удалось связаться с сервером'
          }
        }
      }
    }
    const clickedUpdateBtn: Element | null = target.closest('.update-btn')
    if (clickedUpdateBtn) {
      const noteUpdate: HTMLDivElement | null =
        clickedUpdateBtn.closest<HTMLDivElement>('.note')

      if (noteUpdate) {
        const id: string | undefined = noteUpdate.dataset.id

        const titleEl: HTMLParagraphElement | null =
          noteUpdate.querySelector('p')
        const title = titleEl?.textContent

        if (id && title) {
          modalNote({ id, title }, noteUpdate)
        }
      }
    }
  }
})

if (addNoteForm && noteTitle && errorMessage) {
  addNoteForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const titleData = noteTitle.value.trim()

    if (!titleData) {
      if (errorMessage) {
        errorMessage.textContent = 'Title is required'
      }
      return
    }

    try {
      const response = await fetch('/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          title: titleData,
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        if (errorMessage) {
          errorMessage.textContent = result.message
        }

        return
      }
      if (notesList) {
        const createdNote = result.note
        const note = structureNote(createdNote)
        notesList.append(note)
      }
      noteTitle.value = ''
      noteTitle.focus()
      if (errorMessage) {
        errorMessage.textContent = ''
      }
    } catch (error) {
      if (errorMessage) {
        errorMessage.textContent = 'POST Не удалось связаться с сервером'
      }
    }
  })
}
