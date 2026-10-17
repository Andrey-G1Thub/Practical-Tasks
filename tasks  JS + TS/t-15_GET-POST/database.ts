export const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
export const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments'

export const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const mockPosts: Post[] = [
  {
    userId: 1,
    id: 1,
    title: 'Первый локальный пост',
    body: 'Это текст первого поста для проверки без интернета.',
  },
  {
    userId: 1,
    id: 2,
    title: 'Второй локальный пост',
    body: 'А это содержимое второго поста, всё работает локально!',
  },
  {
    userId: 1,
    id: 7,
    title: 'Пост номер семь (как раньше)',
    body: 'Тестовый текст для седьмого поста с моковых данных.',
  },
]

export const mockComments: Comment[] = [
  {
    postId: 1,
    id: 1,
    name: 'круто',
    email: 'ivan@test.com',
    body: 'Отличная статья!',
  },
  {
    postId: 1,
    id: 2,
    name: 'спасибо',
    email: 'olga@test.com',
    body: 'Очень помогло разобраться.',
  },
  {
    postId: 2,
    id: 3,
    name: 'вопрос',
    email: 'alex@test.com',
    body: 'А как это сделать на React?',
  },
  {
    postId: 7,
    id: 4,
    name: 'комментарий',
    email: 'maxim@gmail.com',
    body: 'Работает как часы!',
  },
]

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}
export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
export type Comments = Comment[]

export type InputText = string | number
export type InputBody = string | number
