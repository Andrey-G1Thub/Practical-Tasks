import type { Post } from '../database'
import { fetchAllPosts, updatePost } from '../api.js'
import { container } from '../index.js'
import { createPost, oldPosts } from './ui'

export const createModalWindow = (post: Post): void => {
  // <form id="post-form" class="post-form">
  const modalContainer: HTMLDivElement = document.createElement('div')
  modalContainer.className = 'modal-container'
  modalContainer.id = 'modal-window'

  const modalForm: HTMLFormElement = document.createElement('form')
  modalForm.id = 'modal-form'
  modalForm.className = 'modal-form'
  // modalForm.style.display = 'block'

  // <input type="text" id="post-title-input" placeholder="Название поста"
  const modalTitleInput: HTMLInputElement = document.createElement('input')
  modalTitleInput.type = 'text'
  modalTitleInput.id = 'modal-title-input'
  modalTitleInput.placeholder = `Название Поста: ${post.title}`
  modalTitleInput.name = 'titleName'
  modalTitleInput.required = true

  // <textarea id="post-body-input" placeholder="Текст поста" required></textarea>
  const modalBodyInput: HTMLTextAreaElement = document.createElement('textarea')
  modalBodyInput.id = 'modal-body-input'
  modalBodyInput.name = 'titleBody'
  modalBodyInput.placeholder = `Текст поста: ${post.title}`
  modalBodyInput.required = true

  // <button type="submit">Опубликовать</button>
  const buttonSubmit: HTMLButtonElement = document.createElement('button')
  buttonSubmit.type = 'submit'
  buttonSubmit.innerText = 'обновить'

  // Кнопка закрытия/отмены модалки
  const buttonCancel: HTMLButtonElement = document.createElement('button')
  buttonCancel.type = 'button'
  buttonCancel.innerText = 'Отмена'
  buttonCancel.addEventListener('click', () => {
    modalContainer.remove() // Закрываем модалку без сохранения
  })

  // Закрытие по клику на темный фон вокруг формы
  modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
      modalContainer.remove()
    }
  })

  modalForm.addEventListener('submit', async (event: SubmitEvent) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const titleName = form.elements.namedItem('titleName') as HTMLInputElement
    const titleBody = form.elements.namedItem(
      'titleBody',
    ) as HTMLTextAreaElement

    // const { titleName, titleBody } = (event.target as HTMLFormElement)
    //   .elements as any
    const inputTitle = titleName.value.trim()
    const inputBody = titleBody.value.trim()

    if (inputTitle && inputBody) {
      console.log(`Вы обновили ${inputTitle} с текстом ${inputBody}`)
      const updated = await updatePost(
        post.id,
        post.userId,
        inputTitle,
        inputBody,
      )
      if (updated) {
        const postsData = await fetchAllPosts()
        oldPosts()
        postsData?.forEach(({ post, comments }) => createPost(post, comments))
        modalContainer.remove()
      }
    } else {
      alert(`Введите правильные данные!`)
    }
  })

  modalForm.append(modalTitleInput, modalBodyInput, buttonSubmit, buttonCancel)
  modalContainer.append(modalForm)
  container?.append(modalContainer)
}
