import { toggleHidden } from './loader.js'
import { BASE_URL } from './database.js'
import { oldPosts } from './component/ui.js'
import type { Post, InputText, InputBody, Comment } from './database.js'
import { createPost } from './component/ui.js'

export const renderOnePost = async (id: number = 7): Promise<void> => {
  try {
    toggleHidden()

    const [postResponse, commentsResponse] = await Promise.all([
      fetch(`${BASE_URL}/posts/${id}`),
      fetch(`${BASE_URL}/posts/${id}/comments`),
    ])
    if (!postResponse.ok) {
      throw new Error(`Пост с ${id} не найден на сервере`)
    }
    const post: Post = await postResponse.json()
    const comments: Comment[] = commentsResponse.ok
      ? await commentsResponse.json()
      : []
    oldPosts()
    createPost(post, comments)

    // для мока
    // await new Promise((resolve) => setTimeout(resolve, 400))

    //  Ищем пост в локальной "базе"
    // const post = mockPosts.find((p) => Number(p.id) === Number(id))

    // if (!post) {
    //   throw new Error(`Пост с ID ${id} не найден в локальной базе`)
    // }

    // oldPosts()
    // const comments = mockComments.filter((c) => c.postId === Number(id))
    // createPost(post, comments)
    //
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

    const response = await fetch(`${BASE_URL}/posts?_limit=10`)
    if (!response.ok) {
      throw new Error('Ошибка загрузки постов')
    }
    const posts: Post[] = await response.json()

    oldPosts()

    for (const post of posts) {
      const commentsResp = await fetch(`${BASE_URL}/post/${post.id}/comments`)
      const comments: Comment[] = commentsResp.ok
        ? await commentsResp.json()
        : []
      createPost(post, comments)
    }

    // //для мока
    //     await new Promise((resolve) => setTimeout(resolve, 400))

    //     oldPosts()
    //     // Ищем пост в локальной "базе"
    //     mockPosts.forEach((el) => {
    //       const comments = mockComments.filter((c) => c.postId === Number(el.id))
    //       const isComments = comments.length > 0 ? comments : []
    //       createPost(el, isComments)
    // })
    //
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

    const response: Response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        title: titleName,
        body: titleBody,
        userId: 1, //в будущем  вместо единицы сюда будет подставляться ID залогиненного пользователя.
      }),
    })

    if (!response.ok) {
      throw new Error('Ошибка создания поста')
    }

    const createdPost = await response.json()
    console.log('Пост создан на сервере:', createdPost)
    oldPosts()
    createPost(createdPost, [])

    // для мока
    // await new Promise((resolve) => setTimeout(resolve, 500))

    // const newPostObj: Post = {
    //   userId: 101,
    //   id: mockPosts.length + 1,
    //   title: titleName,
    //   body: titleBody,
    // }
    // mockPosts.push(newPostObj)
    // createPost(newPostObj, [])
    //
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally renderNewPost')
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
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PUT', // или PATCH
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ id, userId, title: titleName, body: titleBody }),
    })

    if (!response.ok) {
      throw new Error('Ошибка при обновлении поста')
    }

    const updatedPost: Post = await response.json()
    console.log('Пост успешно обновлен на сервере:', updatedPost)

    const currentPostsOnScreen = document.querySelectorAll('#post')
    if (currentPostsOnScreen.length === 1) {
      renderOnePost(id)
    } else {
      renderAllPosts()
    }

    // для мока
    // await new Promise((resolve) => setTimeout(resolve, 500))
    // const index = mockPosts.findIndex((p) => p.id === id)

    // if (index !== -1) {
    //   mockPosts[index] = {
    //     userId: userId,
    //     id: id,
    //     title: titleName,
    //     body: titleBody,
    //   }
    // }
    // const currentPostsOnScreen = document.querySelectorAll('#post')
    // if (currentPostsOnScreen.length === 1) {
    //   // Если открывали ровно один пост — показываем его же обновленным
    //   renderOnePost(id)
    // } else {
    //   // Если смотрели общий список (или ничего) — перерисовываем все посты
    //   renderAllPosts()
    // }
    //
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('finally updatePost')
    toggleHidden()
  }
}

export const deletePost = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id} `, {
      method: 'DELETE',
    })
    if (response.ok) {
      console.log(`Пост с ID ${id} успешно удален на сервере`)
    }
    // для мока
    // const index = mockPosts.findIndex((p) => p.id === id)

    // if (index !== -1) {
    //   mockPosts.splice(index, 1)
    //   console.log('Массив после удаления:', mockPosts)
    // }
  } catch (error) {
    console.error('Ошибка при удалении поста:', error)
  }
}
