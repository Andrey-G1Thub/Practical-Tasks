export interface ValidationResult {
  isValid: boolean
  errorMessage?: string
}

/**
 * Валидация заголовка и тела поста
 */
export const validatePostForm = (
  title: string,
  body: string,
): ValidationResult => {
  const trimmedTitle = title.trim()
  const trimmedBody = body.trim()

  if (!trimmedTitle) {
    return { isValid: false, errorMessage: 'Заголовок не может быть пустым' }
  }

  if (trimmedTitle.length < 3) {
    return {
      isValid: false,
      errorMessage: 'Заголовок должен быть не короче 3 символов',
    }
  }

  if (!trimmedBody) {
    return { isValid: false, errorMessage: 'Текст поста не может быть пустым' }
  }

  return { isValid: true }
}

/**
 * Валидация ID для поиска поста
 */
export const validatePostId = (idInput: string): boolean => {
  const num = Number(idInput.trim())
  return !isNaN(num) && num > 0 && Number.isInteger(num)
}
