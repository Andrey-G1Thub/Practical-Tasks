import type { Post, Comments, Comment } from '../../database.js'
import { createModalWindow } from './modal.js'
import {
  createNewPostOnServer,
  fetchOnePost,
  fetchAllPosts,
  deletePostOnServer,
} from '../api/api.js'
import { validatePostForm } from '../validators/validators.js'
import { container } from '../../index.js'

export const oldPosts = (): void => {
  const oldPosts = document.querySelectorAll('.post')

  if (oldPosts) {
    oldPosts.forEach((el) => el.remove())
  }
}

export const createPost = (post: Post, comments: Comments) => {
  const postConteiner: HTMLDivElement = document.createElement('div')
  postConteiner.id = `post-${post.id}`
  postConteiner.className = 'post'

  //h1
  const postTitle: HTMLHeadingElement = document.createElement('h1')
  postTitle.className = 'post__title'
  postTitle.innerText = `Название Поста: ${post.title}`

  const updateButton: HTMLButtonElement = document.createElement('button')
  updateButton.type = 'submit'
  updateButton.className = 'update-button'
  updateButton.innerText = 'обновить пост'

  updateButton.addEventListener('click', () => {
    // Защита от открытия нескольких модалок одновременно
    if (document.querySelector('#modal-window')) return
    createModalWindow(post, postConteiner)
  })

  const deleteButton: HTMLButtonElement = document.createElement('button')
  deleteButton.type = 'submit'
  deleteButton.className = 'delete-button'
  deleteButton.innerText = 'Удалить пост'

  deleteButton.addEventListener('click', () => {
    deletePostOnServer(post.id)
    postConteiner.remove()
  })

  // <p class="post__text">Текст Поста</p>
  const postText: HTMLParagraphElement = document.createElement('p')
  postText.className = 'post__text'
  postText.innerText = `Текст Поста: ${post.body}`
  //<b class="post__comments-text">Комментарии</b>

  const postCommentsText: HTMLElement = document.createElement('b')
  postCommentsText.className = 'post__comments-text '
  postCommentsText.innerText = `Комментарии : ${comments.length}`

  // <div class="post__comments">
  const postComments: HTMLDivElement = document.createElement('div')
  postComments.className = 'post__comments'
  postComments.style.display = 'none'

  postCommentsText.addEventListener('click', () => {
    if (postComments.style.display === 'none') {
      postComments.style.display = 'block'
      console.log('Комментарии открыты')
    } else {
      postComments.style.display = 'none'
      console.log('Комментарии закрыты')
    }
  })

  comments.forEach((element: Comment) => {
    // <div class="post-comment">
    const postComment: HTMLDivElement = document.createElement('div')
    postComment.className = 'post-comment'

    // <span class="post-comment__author">maxim@gmail.com</span>
    const postCommentAuthor: HTMLSpanElement = document.createElement('span')
    postCommentAuthor.className = 'post-comment__author'
    postCommentAuthor.innerText = `Автор : ${element.email}`

    // <span class="post-comment__text">
    const postCommentText: HTMLSpanElement = document.createElement('span')
    postCommentText.className = 'post-comment__text'
    postCommentText.innerText = `комментарий : ${element.body}`

    postComment.append(postCommentAuthor, postCommentText)
    postComments.append(postComment)
  })

  postConteiner.append(
    postTitle,
    postText,
    postCommentsText,
    postComments,
    deleteButton,
    updateButton,
  )
  // const container: HTMLBodyElement | null = document.querySelector('body')
  container?.append(postConteiner)
}

export const createForm = (): void => {
  // <form id="post-form" class="post-form">
  const postForm: HTMLFormElement = document.createElement('form')
  postForm.id = 'post-form'
  postForm.className = 'post-form'

  // <input type="text" id="post-title-input" placeholder="Название поста"
  const postTitleInput: HTMLInputElement = document.createElement('input')
  postTitleInput.type = 'text'
  postTitleInput.id = 'post-title-input'
  postTitleInput.placeholder = 'Название поста'
  postTitleInput.name = 'titleName'
  postTitleInput.required = true

  // <textarea id="post-body-input" placeholder="Текст поста" required></textarea>
  const postBodyInput: HTMLTextAreaElement = document.createElement('textarea')
  postBodyInput.id = 'post-body-input'
  postBodyInput.name = 'titleBody'
  postBodyInput.placeholder = 'Текст поста'
  postBodyInput.required = true

  // <button type="submit">Опубликовать</button>
  const buttonSubmit: HTMLButtonElement = document.createElement('button')
  buttonSubmit.type = 'submit'
  buttonSubmit.innerText = 'Опубликовать'

  postForm.addEventListener('submit', async (event: SubmitEvent) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const titleName = form.elements.namedItem('titleName') as HTMLInputElement
    const titleBody = form.elements.namedItem(
      'titleBody',
    ) as HTMLTextAreaElement

    // const { titleName, titleBody } = (event.target as HTMLFormElement)
    //   .elements as any

    //тестирование
    const validation = validatePostForm(titleName.value, titleBody.value)

    if (validation.isValid) {
      const newPost = await createNewPostOnServer(
        titleName.value.trim(),
        titleBody.value.trim(),
      )
      if (newPost) {
        // Если хотите, чтобы старые посты стирались при создании нового:
        oldPosts()

        createPost(newPost, []) // Комментариев у нового поста пока нет
      }
      titleName.value = ''
      titleBody.value = ''
    } else {
      alert(validation.errorMessage)
    }
    //

    // const inputTitle: InputText = titleName.value.trim()
    // const inputBody: InputBody = titleBody.value.trim()

    // if (inputTitle && inputBody) {
    //   console.log(`Вы создали пост ${inputTitle} с текстом ${inputBody}`)

    //   renderNewPost(inputTitle, inputBody)

    //   titleName.value = ''
    //   titleBody.value = ''
    // } else {
    //   alert(`Введите правильные данные!`)
    // }
  })

  postForm.append(postTitleInput, postBodyInput, buttonSubmit)

  container?.append(postForm)
}

export const createSearchPosts = (): void => {
  const inputContainer: HTMLFormElement = document.createElement('form')
  inputContainer.className = 'input-container'

  const searchInput: HTMLInputElement = document.createElement('input')
  searchInput.className = 'search-input'
  searchInput.name = 'inputId'
  searchInput.type = 'text'
  searchInput.placeholder = 'Введите номер поста'

  const searchButton: HTMLButtonElement = document.createElement('button')
  searchButton.type = 'submit'
  searchButton.className = 'search-button'
  searchButton.innerText = 'найти'

  inputContainer.addEventListener('submit', async (event) => {
    event.preventDefault()

    const id = Number(searchInput.value.trim())

    if (!Number.isInteger(id) || id <= 0) {
      alert('Введите корректный ID поста')
      return
    }

    oldPosts()

    const result = await fetchOnePost(id)

    if (result) {
      createPost(result.post, result.comments)
    } else {
      alert(`Пост с ID ${id} не найден`)
    }

    searchInput.value = ''
  })

  inputContainer.append(searchInput, searchButton)
  const container: HTMLBodyElement | null = document.querySelector('body')
  container?.append(inputContainer)
}

export const createButton = (): void => {
  const getAllButton: HTMLButtonElement = document.createElement('button')
  getAllButton.type = 'submit'
  getAllButton.className = 'get-button'
  getAllButton.innerText = 'найти все посты'

  getAllButton.addEventListener('click', async () => {
    // fetchAllPosts()
    oldPosts()

    const posts = await fetchAllPosts()

    posts.forEach(({ post, comments }) => {
      createPost(post, comments)
    })
  })
  const container: HTMLBodyElement | null = document.querySelector('body')
  container?.append(getAllButton)
}
