import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createNewPostOnServer } from './api' // Укажите правильный путь
import { BASE_URL } from '../../database'

describe('API функция createNewPostOnServer', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('должна успешно отправлять POST-запрос и возвращать созданный пост', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    const mockCreatedPost = {
      id: 101,
      title: 'Новый тестовый заголовок',
      body: 'Новый тестовый текст',
      userId: 1,
    }

    // Мокаем успешный ответ сервера
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCreatedPost,
    } as Response)

    const result = await createNewPostOnServer(
      'Новый тестовый заголовок',
      'Новый тестовый текст',
    )

    // 1. Проверяем, что fetch был вызван с правильным URL и настройками
    expect(fetchSpy).toHaveBeenCalledWith(
      `${BASE_URL}/posts`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          title: 'Новый тестовый заголовок',
          body: 'Новый тестовый текст',
          userId: 1,
        }),
      }),
    )

    // 2. Проверяем, что функция вернула то, что пришло от "сервера"
    expect(result).toEqual(mockCreatedPost)
  })

  it('должна возвращать null, если сервер ответил с ошибкой при создании поста', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    // Мокаем ошибку сервера
    fetchSpy.mockResolvedValueOnce({
      ok: false,
    } as Response)

    const result = await createNewPostOnServer('Заголовок', 'Текст')

    // При ошибке функция должна поймать исключение в catch и вернуть null
    expect(result).toBeNull()
  })
})
