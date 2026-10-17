import { toggleHidden } from './loader.js'
import { mockPosts, mockComments } from './database.js'
import { oldPosts } from './component/ui.js'
import type { Post, InputText, InputBody } from './database.js'
import { createPost } from './component/ui.js'
import { container } from './index.js'

export const renderOnePost = async (id: number = 7): Promise<void> => {
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
    console.log('finally из renderOnePost')
    toggleHidden()
  }
}

export const renderAllPosts = async (): Promise<void> => {
  try {
    toggleHidden()

    await new Promise((resolve) => setTimeout(resolve, 400))

    oldPosts()
    // Ищем пост в локальной "базе"
    mockPosts.forEach((el) => {
      const comments = mockComments.filter((c) => c.postId === Number(el.id))
      const isComments = comments.length > 0 ? comments : []
      createPost(el, isComments)
    })
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally из renderPost')
    toggleHidden()
  }
}

export const renderNewPost = async (
  titleName: InputText,
  titleBody: InputBody,
): Promise<void> => {
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

    createPost(newPostObj, [])
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally')
    toggleHidden()
  }
}
export const updatePost = async (
  id: number,
  userId: number,
  titleName: InputText,
  titleBody: InputBody,
): Promise<void> => {
  try {
    toggleHidden()

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

    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = mockPosts.findIndex((p) => p.id === id)

    if (index !== -1) {
      mockPosts[index] = {
        userId: userId,
        id: id,
        title: titleName,
        body: titleBody,
      }
    }

    const currentPostsOnScreen = document.querySelectorAll('#post')

    if (currentPostsOnScreen.length === 1) {
      // Если открывали ровно один пост — показываем его же обновленным
      renderOnePost(id)
    } else {
      // Если смотрели общий список (или ничего) — перерисовываем все посты
      renderAllPosts()
    }
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally updatePost')
    toggleHidden()
  }
}

export const deletePost = (id: number): void => {
  const index = mockPosts.findIndex((p) => p.id === id)

  if (index !== -1) {
    mockPosts.splice(index, 1)
    console.log('Массив после удаления:', mockPosts)
  }
}
