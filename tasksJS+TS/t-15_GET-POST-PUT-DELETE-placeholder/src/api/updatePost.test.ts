import { describe, it, expect, vi, beforeEach } from 'vitest'
import { updatePost } from './api'
import { BASE_URL } from '../../database'

describe('API функции для работы с постами (Update, Delete, FetchOne)', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('updatePost', () => {
    it('должна успешно обновлять пост методом PUT и возвращать измененный объект', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch')
      const updatedMockPost = {
        id: 5,
        userId: 1,
        title: 'Новый заголовок',
        body: 'Новый текст',
      }

      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: async () => updatedMockPost,
      } as Response)

      const result = await updatePost(5, 1, 'Новый заголовок', 'Новый текст')

      // Проверяем, что запрос ушел на правильный URL с методом PUT
      expect(fetchSpy).toHaveBeenCalledWith(
        `${BASE_URL}/posts/5`,
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({
            id: 5,
            userId: 1,
            title: 'Новый заголовок',
            body: 'Новый текст',
          }),
        }),
      )

      expect(result).toEqual(updatedMockPost)
    })

    it('должна возвращать null при ошибке обновления на сервере', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch')

      fetchSpy.mockResolvedValueOnce({
        ok: false,
      } as Response)

      const result = await updatePost(5, 1, 'Заголовок', 'Текст')
      expect(result).toBeNull()
    })
  })
})
