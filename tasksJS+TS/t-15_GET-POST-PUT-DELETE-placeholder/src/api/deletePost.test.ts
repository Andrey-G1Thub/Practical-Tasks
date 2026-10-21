import { describe, it, expect, vi } from 'vitest'
import { deletePostOnServer } from './api'
import { BASE_URL } from '../../database'

describe('deletePostOnServer', () => {
  it('должна успешно удалять пост методом DELETE и возвращать true', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    fetchSpy.mockResolvedValueOnce({
      ok: true,
    } as Response)

    const result = await deletePostOnServer(7)

    expect(fetchSpy).toHaveBeenCalledWith(
      `${BASE_URL}/posts/7 `,
      expect.objectContaining({
        method: 'DELETE',
      }),
    )

    expect(result).toBe(true)
  })

  it('должна возвращать false, если удаление завершилось с ошибкой', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    fetchSpy.mockResolvedValueOnce({
      ok: false,
    } as Response)

    const result = await deletePostOnServer(7)
    expect(result).toBe(false)
  })
})
