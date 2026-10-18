import { describe, it, expect } from 'vitest'
import { validatePostForm, validatePostId } from './validators'

describe('validatePostForm()', () => {
  it('должна возвращать isValid: true для корректных данных', () => {
    const result = validatePostForm(
      'Заголовок поста',
      'Текст поста для проверки',
    )
    expect(result.isValid).toBe(true)
    expect(result.errorMessage).toBeUndefined()
  })

  it('должна отклонять пустой заголовок', () => {
    const result = validatePostForm('   ', 'Текст поста')
    expect(result.isValid).toBe(false)
    expect(result.errorMessage).toBe('Заголовок не может быть пустым')
  })

  it('должна отклонять заголовок короче 3 символов', () => {
    const result = validatePostForm('Аб', 'Текст поста')
    expect(result.isValid).toBe(false)
    expect(result.errorMessage).toBe(
      'Заголовок должен быть не короче 3 символов',
    )
  })

  it('должна отклонять пустое тело поста', () => {
    const result = validatePostForm('Хороший заголовок', '')
    expect(result.isValid).toBe(false)
    expect(result.errorMessage).toBe('Текст поста не может быть пустым')
  })
})

describe('validatePostId()', () => {
  it('должна возвращать true для положительных целых чисел', () => {
    expect(validatePostId('7')).toBe(true)
    expect(validatePostId(' 42 ')).toBe(true)
  })

  it('должна возвращать false для букв, отрицательных чисел и дробей', () => {
    expect(validatePostId('abc')).toBe(false)
    expect(validatePostId('-5')).toBe(false)
    expect(validatePostId('3.14')).toBe(false)
    expect(validatePostId('')).toBe(false)
  })
})
