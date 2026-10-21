import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchAllPosts } from './api'

describe('API функция fetchAllPosts', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('должна успешно возвращать массив постов и комментариев', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    // 1. Первый вызов fetch (посты)
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, title: 'Пост 1', body: 'Текст 1', userId: 1 },
      ],
    } as Response)

    // 2. Второй вызов fetch (комментарии)
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { postId: 1, id: 1, name: 'коммент', email: 'a@b.com', body: 'Текст' },
      ],
    } as Response)

    const result = await fetchAllPosts()

    expect(result).toHaveLength(1)
    expect(result[0].post.title).toBe('Пост 1')
    expect(result[0].comments[0].email).toBe('a@b.com')
  })

  it('должна возвращать пустой массив при ошибке сервера', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    fetchSpy.mockResolvedValueOnce({
      ok: false,
    } as Response)

    const result = await fetchAllPosts()

    expect(result).toEqual([])
  })
})
