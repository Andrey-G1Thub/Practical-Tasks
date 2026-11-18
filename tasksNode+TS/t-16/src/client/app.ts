import { stuctureNote } from './component/note'
import type { Note } from '../shared/note_types'
import { modalNote } from './component/modal'

const noteTitle = document.querySelector<HTMLInputElement>('#note-title')

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOMContentLoaded сработал')
  if (!notesList || !errorMessage) {
    return
  }
  try {
    const response = await fetch('/notes', {
      method: 'GET',
    })
    const result = await response.json()

    if (!response.ok) {
      console.log(result.message)
      errorMessage.textContent = result.message // Сервер доступен, но вернул HTTP-ошибку
      return
    }

    errorMessage.textContent = ''
    const notes: Note[] = result

    notes.forEach((el) => {
      // const elP = document.createElement('p')
      // elP.textContent = el.title
      const note = stuctureNote(el)

      notesList.append(note)
    })

    console.log('Заметка получена')
  } catch (error) {
    console.log('error', error)
    errorMessage.textContent = 'GET Не удалось связаться с сервером '
  }
})

const errorMessage: HTMLParagraphElement | null =
  document.querySelector<HTMLParagraphElement>('#error-message')

const notesList = document.querySelector<HTMLDivElement>('#notes-list')
notesList?.addEventListener('click', async (event) => {
  const target = event.target

  if (target instanceof Element) {
    const clickedEl = target.closest('.delete-btn')
    if (clickedEl) {
      const note = clickedEl.closest<HTMLDivElement>('.note')

      if (note) {
        const id = note.dataset.id
        if (!id) {
          console.log('ID заметки отсутствует')
          return
        }

        try {
          const response = await fetch(`/notes/${id}`, {
            method: 'DELETE',
          })

          if (!response.ok) {
            const result = await response.json()
            console.log('result', result)
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
          console.log('error', error)
          if (errorMessage) {
            errorMessage.textContent = ' DELETE Не удалось связаться с сервером'
          }
        }
      }
    }
  }

  if (target instanceof Element) {
    const clickedUpdateBtn: Element | null = target.closest('.update-btn')
    if (clickedUpdateBtn) {
      const noteUpdate: HTMLDivElement | null =
        clickedUpdateBtn.closest<HTMLDivElement>('.note')
      console.log('noteUpdate', noteUpdate)

      if (noteUpdate) {
        const id: string | undefined = noteUpdate.dataset.id

        const titleEl: HTMLParagraphElement | null =
          noteUpdate.querySelector('p')
        const title: string | undefined = titleEl?.textContent

        if (id && title) {
          modalNote({ id, title })
        }

        // console.log('нажал на кнопку обновить')
        // if (id) {
        //   return
        // }

        // const modal = modalNote(noteUpdate)
        // console.log('modal', modal)

        // if (!titleData) {
        //   console.log('Title is required')
        //   errorMessage.textContent = 'Title is required'
        //   return
        // }

        // try {
        //   const response = await fetch(`/notes/${id}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        //     body: JSON.stringify({
        //       title: 'Обновлено',
        //       // title: modal,
        //     }),
        //   })

        //   if (!response.ok) {
        //     // console.log('result', resultUpdate)
        //     if (errorMessage) {
        //       // errorMessage.textContent = resultUpdate.message
        //     }

        //     return
        //   }
        //   const resultUpdate = await response.json()
        //   if (errorMessage) {
        //     errorMessage.textContent = ''
        //   }
        //   return resultUpdate
        // } catch (error) {
        //   console.log('error', error)
        //   if (errorMessage) {
        //     errorMessage.textContent = ' UPDATE Не удалось связаться с сервером'
        //   }
        // }
      }
    }
  }
})

const addNoteForm = document.querySelector<HTMLFormElement>('#add-note-form')

if (addNoteForm && noteTitle && errorMessage) {
  addNoteForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const titleData = noteTitle.value.trim()

    if (!titleData) {
      console.log('Title is required')
      errorMessage.textContent = 'Title is required'
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
        console.log(result.message)
        errorMessage.textContent = result.message

        return
      }
      if (notesList) {
        // const elP = document.createElement('p')
        // elP.textContent = result.note.title
        // notesList.append(elP)

        const createdNote = result.note
        const note = stuctureNote(createdNote)
        notesList.append(note)
        console.log('Создана')
      }
      noteTitle.value = ''
      noteTitle.focus()
      errorMessage.textContent = ''
    } catch (error) {
      console.log('error', error)
      errorMessage.textContent = 'POST Не удалось связаться с сервером'
    }
  })
}
