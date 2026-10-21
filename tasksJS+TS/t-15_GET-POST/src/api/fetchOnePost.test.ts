import { describe, it, expect, vi } from 'vitest'
import { fetchOnePost } from './api'
import { BASE_URL } from '../../database'

describe('fetchOnePost', () => {
  it('должна параллельно запрашивать пост и комментарии через Promise.all', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const mockPost = { id: 7, userId: 1, title: 'Пост 7', body: 'Текст' }
    const mockComments = [
      {
        postId: 7,
        id: 1,
        name: 'Тест',
        email: 'test@test.com',
        body: 'Коммент',
      },
    ]

    // Мокаем ответ для поста
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost,
    } as Response)

    // Мокаем ответ для комментариев (так как используется Promise.all, порядок важен)
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockComments,
    } as Response)

    const result = await fetchOnePost(7)

    // Проверяем, что запросы ушли на нужные эндпоинты
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL}/posts/7`)
    expect(fetchSpy).toHaveBeenCalledWith(`${BASE_URL}/posts/7/comments`)

    // Проверяем итоговую структуру
    expect(result).toEqual({
      post: mockPost,
      comments: mockComments,
    })
  })
  it('должна возвращать undefined, если запрашиваемый пост не найден', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    // Сервер возвращает ошибку на запрос поста
    fetchSpy.mockResolvedValueOnce({
      ok: false,
    } as Response)

    // Запрос комментариев тоже может вернуть что угодно, но первый response.ok провалится
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response)

    const result = await fetchOnePost(999)
    expect(result).toBeUndefined()
  })
})
