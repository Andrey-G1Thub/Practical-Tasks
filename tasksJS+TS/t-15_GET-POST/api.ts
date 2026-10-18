import { toggleHidden } from './loader.js'
import { BASE_URL } from './database.js'
import type { Post, InputText, InputBody, Comment } from './database.js'

export const fetchOnePost = async (
  id: number = 7,
): Promise<
  | {
      post: Post
      comments: Comment[]
    }
  | undefined
> => {
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

    return { post, comments }

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
    return undefined
  } finally {
    console.log('finally из renderOnePost')
    toggleHidden()
  }
}

export const fetchAllPosts = async () => {
  try {
    toggleHidden()
    const response = await fetch(`${BASE_URL}/posts?_limit=10`)
    if (!response.ok) throw new Error('Ошибка загрузки постов')
    const posts: Post[] = await response.json()

    const result = []
    for (const post of posts) {
      const commentsResp = await fetch(`${BASE_URL}/posts/${post.id}/comments`)
      const comments: Comment[] = commentsResp.ok
        ? await commentsResp.json()
        : []
      result.push({ post, comments })
    }
    return result
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
    return []
  } finally {
    toggleHidden()
  }
}

export const createNewPostOnServer = async (
  titleName: InputText,
  titleBody: InputBody,
): Promise<Post | null> => {
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

    return await response.json()

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
    return null
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
): Promise<Post | null> => {
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

    const updatePost: Post = await response.json()
    console.log('Пост успешно обновлен на сервере:', updatePost)

    return updatePost

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
    return null
  } finally {
    console.log('finally updatePost')
    toggleHidden()
  }
}

export const deletePostOnServer = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id} `, {
      method: 'DELETE',
    })
    return response.ok
    // для мока
    // const index = mockPosts.findIndex((p) => p.id === id)

    // if (index !== -1) {
    //   mockPosts.splice(index, 1)
    //   console.log('Массив после удаления:', mockPosts)
    // }
  } catch (error) {
    console.error('Ошибка при удалении поста:', error)
    return false
  }
}
