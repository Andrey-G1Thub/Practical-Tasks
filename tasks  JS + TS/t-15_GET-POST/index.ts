import type { Post, Comments, Comment } from './database.js'
import { mockPosts, mockComments } from './database.js'
import { toggleHidden } from './loader.js'

const container: HTMLBodyElement | null = document.querySelector('body')

const createSearchPosts = () => {
  const inputContainer = document.createElement('form')
  inputContainer.className = 'input-container'

  const searchInput = document.createElement('input')
  searchInput.className = 'search-input'
  searchInput.name = 'inputId'
  searchInput.type = 'text'
  searchInput.placeholder = 'Введите номер поста'

  const searchButton = document.createElement('button')
  searchButton.type = 'submit'
  searchButton.className = 'search-button'
  searchButton.innerText = 'найти'

  inputContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    // console.log('ищу данные')

    const { inputId } = (event.target as HTMLFormElement).elements as any

    // console.log('inputId', inputId)
    const id = inputId.value
    // console.log('id', id)

    if (id) {
      // console.log(`пост номер ${id} найден `)

      // findPost(mockPosts, id)
      renderOnePost(id)
      inputId.value = ''
    }
  })

  inputContainer.append(searchInput, searchButton)
  container?.append(inputContainer)
}
const createButton = () => {
  const getAllButton = document.createElement('button')
  getAllButton.type = 'submit'
  getAllButton.className = 'get-button'
  getAllButton.innerText = 'найти все посты'

  getAllButton.addEventListener('click', () => {
    renderAllPosts()
  })
  container?.append(getAllButton)
}
const createForm = () => {
  // <form id="post-form" class="post-form">
  const postForm = document.createElement('form')
  postForm.id = 'post-form'
  postForm.className = 'post-form'

  // <input type="text" id="post-title-input" placeholder="Название поста"
  const postTitleInput = document.createElement('input')
  postTitleInput.type = 'text'
  postTitleInput.id = 'post-title-input'
  postTitleInput.placeholder = 'Название поста'
  postTitleInput.name = 'titleName'
  postTitleInput.required = true

  // <textarea id="post-body-input" placeholder="Текст поста" required></textarea>
  const postBodyInput = document.createElement('textarea')
  postBodyInput.id = 'post-body-input'
  postBodyInput.name = 'titleBody'
  postBodyInput.placeholder = 'Текст поста '
  postBodyInput.required = true

  // <button type="submit">Опубликовать</button>
  const buttonSubmit = document.createElement('button')
  buttonSubmit.type = 'submit'
  buttonSubmit.innerText = 'Опубликовать'

  postForm.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault()
    // const { target } = event
    // const inputTitle = target.titleName.value

    const { titleName, titleBody } = (event.target as HTMLFormElement)
      .elements as any
    const inputTitle = titleName.value.trim()

    const inputBody = titleBody.value

    if (inputTitle && inputBody) {
      console.log(`Вы создали пост ${inputTitle} с текстом ${inputBody}`)

      renderNewPost(inputTitle, inputBody)

      titleName.value = ''
      titleBody.value = ''
    } else {
      alert(`Введите правильные данные!`)
    }
  })

  postForm.append(postTitleInput, postBodyInput, buttonSubmit)
  container?.append(postForm)
}

const createPost = (post: Post, comments: Comments) => {
  const postConteiner: HTMLDivElement = document.createElement('div')
  postConteiner.id = 'post'
  postConteiner.className = 'post'

  // postConteiner.addEventListener('click', () => {
  //   console.log('клик на post')
  // })
  //h1
  const postTitle: HTMLHeadingElement = document.createElement('h1')
  postTitle.className = 'post__title'
  postTitle.innerText = `Название Поста: ${post.title}`

  const updateButton = document.createElement('button')
  updateButton.type = 'submit'
  updateButton.className = 'update-button'
  updateButton.innerText = 'обновить пост'

  //для placeHolder
  // updateButton.addEventListener('click', async () => {
  //   try {
  //     toggleHidden()

  //     const newTitle = 'Обновленный заголовок'
  //     const newBody = 'Новый текст поста'

  //     // 1. Отправляем запрос на сервер для обновления данных
  //     const response = await fetch(`${POSTS_URL}/${post.id}`, {
  //       method: 'PUT', // или PATCH
  //       headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  //       body: JSON.stringify({ title: newTitle, body: newBody, userId: post.userId, id: post.id })
  //     })

  //     if (!response.ok) {
  //       throw new Error('Ошибка при обновлении поста')
  //     }

  //     const updatedPost = await response.json()

  //     // 2. Обновляем данные в локальном объекте и на экране
  //     post.title = updatedPost.title
  //     post.body = updatedPost.body

  //     postTitle.innerText = `Название Поста: ${post.title}`
  //     postText.innerText = `Текст Поста: ${post.body}`

  //     console.log('Пост успешно обновлен на сервере!', updatedPost)
  //   } catch (error) {
  //     console.log('error', error)
  //   } finally {
  //     toggleHidden()
  //   }
  // })

  updateButton.addEventListener('click', (event) => {
    // event.preventDefault()

    // renderUpdatePost(newTitle, newBody)
    const newTitle = 'обновленный пост'
    const newBody = 'Обновленный текс поста'
    postTitle.innerText = newTitle
    postText.innerText = newBody

    // post.title = 'обновленный пост'
    // post.body = 'Обновленный текс поста'
    console.log('post', post)
    post.title = postTitle.innerText
    post.body = postText.innerText

    console.log('mockPosts', mockPosts)
  })

  const deleteButton = document.createElement('button')
  deleteButton.type = 'submit'
  deleteButton.className = 'delete-button'
  deleteButton.innerText = 'Удалить пост'

  deleteButton.addEventListener('click', () => {
    const index = mockPosts.findIndex((p) => p.id === post.id)

    if (index !== -1) {
      mockPosts.splice(index, 1)
      console.log('Массив после удаления:', mockPosts)
    }
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
    console.log('нажал на Комментарии')

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
  container?.append(postConteiner)
}
const oldPosts = () => {
  const oldPosts = document.querySelectorAll('#post')

  if (oldPosts) {
    oldPosts.forEach((el) => el.remove())
  }
}

// -------------- рендер

const renderOnePost = async (id: number = 7): Promise<void> => {
  try {
    toggleHidden()

    // const response: Response = await fetch(`${POSTS_URL}/${id}`, {
    //   method: 'GET',
    // })
    // if (!response.ok) {
    //   throw new Error('Ошибка запроса')
    // }

    // const post: Post = await response.json()
    // const postId = post.id

    // const responseComment = await fetch(`${COMMENTS_URL}?postId=${postId}`)

    // if (!responseComment.ok) {
    //   throw new Error('Ошибка запроса комментариев')
    // }
    // const comments: Comments = await responseComment.json()
    //
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Ищем пост в локальной "базе"
    const post = mockPosts.find((p) => Number(p.id) === Number(id))

    if (!post) {
      throw new Error(`Пост с ID ${id} не найден в локальной базе`)
    }

    oldPosts()

    const comments = mockComments.filter((c) => c.postId === Number(id))
    createPost(post, comments)
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally из renderPost')
    toggleHidden()
  }
}
const renderAllPosts = async () => {
  try {
    toggleHidden()

    await new Promise((resolve) => setTimeout(resolve, 400))

    oldPosts()
    // Ищем пост в локальной "базе"
    mockPosts.forEach((el) => {
      const comments = mockComments.filter((c) => c.postId === Number(el.id))
      const isComments = comments ? comments : []
      createPost(el, isComments)
    })

    // console.log('allPost, ', allPost)
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally из renderPost')
    toggleHidden()
  }
}
// const sendNewPost = async (titleName, titleBody) => {
const renderNewPost = async (titleName: any, titleBody: any) => {
  try {
    toggleHidden()
    // console.log('создаем новый пост')
    // const responsePost: Response = await fetch(`${POSTS_URL}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    //   body: JSON.stringify({ title: titleName, body: titleBody, userId: 101 }),
    // })
    // // console.log('responsePost', responsePost)

    // if (!responsePost.ok) {
    //   throw new Error('Ошибка создания поста')
    // }

    // const posts = await responsePost.json()
    // console.log('posts', posts)
    // console.log('posts', posts.title, posts.body)
    // createPost(posts, [])
    //
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newPostObj: Post = {
      userId: 101,
      id: mockPosts.length + 1,
      title: titleName,
      body: titleBody,
    }
    mockPosts.push(newPostObj)

    oldPosts()

    createPost(newPostObj, [])
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally')
    toggleHidden()
  }
}

// Инициализация при старте приложения:
const initApp = () => {
  console.log('initApp запущен!')
  // 1. Создаем форму один раз вверху
  createSearchPosts()
  createButton()
  createForm()
}

initApp()
