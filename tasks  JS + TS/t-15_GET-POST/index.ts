// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
// const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments'

// const mockPosts: Post[] = [
//   {
//     userId: 1,
//     id: 1,
//     title: 'Первый локальный пост',
//     body: 'Это текст первого поста для проверки без интернета.',
//   },
//   {
//     userId: 1,
//     id: 2,
//     title: 'Второй локальный пост',
//     body: 'А это содержимое второго поста, всё работает локально!',
//   },
//   {
//     userId: 1,
//     id: 7,
//     title: 'Пост номер семь (как раньше)',
//     body: 'Тестовый текст для седьмого поста с моковых данных.',
//   },
// ]

// const mockComments: Comment[] = [
//   {
//     postId: 1,
//     id: 1,
//     name: 'круто',
//     email: 'ivan@test.com',
//     body: 'Отличная статья!',
//   },
//   {
//     postId: 1,
//     id: 2,
//     name: 'спасибо',
//     email: 'olga@test.com',
//     body: 'Очень помогло разобраться.',
//   },
//   {
//     postId: 2,
//     id: 3,
//     name: 'вопрос',
//     email: 'alex@test.com',
//     body: 'А как это сделать на React?',
//   },
//   {
//     postId: 7,
//     id: 4,
//     name: 'комментарий',
//     email: 'maxim@gmail.com',
//     body: 'Работает как часы!',
//   },
// ]

// interface Post {
//   userId: number
//   id: number
//   title: string
//   body: string
// }
// interface Comment {
//   postId: number
//   id: number
//   name: string
//   email: string
//   body: string
// }
// type Comments = Comment[]

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
    console.log('ищу данные')

    const { inputId } = (event.target as HTMLFormElement).elements as any

    console.log('inputId', inputId)
    const id = inputId.value
    // console.log('id', id)

    if (id) {
      console.log(`пост номер ${id} найден `)

      // findPost(mockPosts, id)
      renderPost(id)
      inputId.value = ''
    }
  })

  // searchInput.append(searchButton)
  // console.log('searchInput, ', searchInput)
  inputContainer.append(searchInput, searchButton)

  container?.append(inputContainer)
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
  buttonSubmit.innerHTML = 'Опубликовать'

  postForm.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault()
    console.log('заработало')
    // const { target } = event

    // console.log('target.titleName.value', target.titleName.value)
    // const inputTitle = target.titleName.value

    const { titleName, titleBody } = (event.target as HTMLFormElement)
      .elements as any
    const inputTitle = titleName.value.trim()

    const inputBody = titleBody.value

    if (inputTitle && inputBody) {
      console.log(`Вы создали пост ${inputTitle} с текстом ${inputBody}`)

      sendNewPost(inputTitle, inputBody)

      titleName.value = ''
      titleBody.value = ''
    } else {
      alert(`Введите правильные данные!`)
    }
  })

  postForm.append(postTitleInput, postBodyInput, buttonSubmit)
  container?.append(postForm)
  // mainContainer.append(postForm)
  // console.log('container', container)
}

const createPost = (post: Post, comments: Comments) => {
  const oldPost = document.querySelector('#post')
  console.log('isPost', oldPost)

  if (oldPost) {
    oldPost.remove()
    console.log('пост удален')
  }

  const postConteiner: HTMLDivElement = document.createElement('div')
  postConteiner.id = 'post'
  postConteiner.className = 'post'
  //h1
  const postTitle: HTMLHeadingElement = document.createElement('h1')
  postTitle.className = 'post__title'
  postTitle.innerText = `Название Поста: ${post.title}`
  // <p class="post__text">Текст Поста</p>
  const postText: HTMLParagraphElement = document.createElement('p')
  postText.className = 'post__text'
  postText.innerText = `Текст Поста: ${post.body}`
  //<b class="post__comments-text">Комментарии</b>
  const postCommentsText: HTMLElement = document.createElement('b')
  postCommentsText.className = 'post__comments-text'
  postCommentsText.innerText = `Комментарии : ${comments.length}`
  // <div class="post__comments">
  const postComments: HTMLDivElement = document.createElement('div')
  postComments.className = 'post__comments'
  comments.forEach((element: Comment) => {
    // <div class="post-comment">
    const postComment: HTMLDivElement = document.createElement('div')
    postComment.className = 'post-comment'
    // <span class="post-comment__author">maxim@gmail.com</span>
    const postCommentAuthor: HTMLSpanElement = document.createElement('span')
    postCommentAuthor.className = 'post-comment__author'
    postCommentAuthor.innerText = `Автор : ${element.email}`
    // <span class="post-comment__text">
    const postCoomment: HTMLSpanElement = document.createElement('span')
    postCoomment.className = 'post-comment__text'
    postCoomment.innerText = `комментарий : ${element.body}`
    postComment.append(postCommentAuthor, postCoomment)
    postComments.append(postComment)
  })

  postConteiner.append(postTitle, postText, postCommentsText, postComments)
  console.log('postConteiner', postConteiner.classList.contains('post'))

  container?.append(postConteiner)
}


// const sendNewPost = async (titleName, titleBody) => {
const sendNewPost = async (titleName: any, titleBody: any) => {
  try {
    toggleHidden()
    console.log('создаем новый пост')
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

    createPost(newPostObj, [])
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally')
    toggleHidden()
  }
}
const findPost = async (postArray, postId) => {
  try {
    toggleHidden()
    console.log('ищем   пост')

    await new Promise((resolve) => setTimeout(resolve, 500))

    const searchPostObj: Post = postArray.find((el) => {
      // console.log('el, ', el)
      // console.log('el.id, ', el.id)

      return Number(el.id) === Number(postId)
    })
    console.log('Нашли пост ', searchPostObj)

    // renderPost(searchPostObj)
  } catch (error) {
    console.log('error: не нашли пост', error)
  } finally {
    console.log('finally')
    toggleHidden()
  }
}
// createForm()

const renderPost = async (id: number = 7): Promise<void> => {
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

    console.log('post ', post)

    if (!post) {
      throw new Error(`Пост с ID ${id} не найден в локальной базе`)
    }

    // const oldPost = document.querySelector('#post')
    // console.log('isPost', oldPost)

    // if (oldPost) {
    //   oldPost.remove()
    //   console.log('пост удален')
    // }

    const comments = mockComments.filter((c) => c.postId === Number(id))
    createPost(post, comments)
    console.log('isPost', oldPost)
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally из renderPost')
    toggleHidden()
  }
}

// Инициализация при старте приложения:
const initApp = () => {
  console.log('initApp запущен!')
  // 1. Создаем форму один раз вверху
  createSearchPosts()
  createForm()

  // 2. Рендерим начальный пост
  // renderPost(2)
  // findPost(mockPosts, id)
}

initApp()
// createForm()
// renderPost(2)
