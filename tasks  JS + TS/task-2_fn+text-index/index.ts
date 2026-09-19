function showSuccessMessage(message: string): void {
  console.log(message)
}

function showErrorMessage(message: string): void {
  console.error(message)
}
type Callback = (message: string) => void

const checkTextOnErrorSymbol = (
  text: string,
  errorSymbol: string,
  successCallback: Callback,
  errorCallback: Callback,
): void => {
  for (let i = 0; i < text.length; i++) {
    if (text[i] === errorSymbol) {
      errorCallback(
        `Найден запрещенный символ  "${errorSymbol}" под индексом ${i}`,
      )
      return
    }
  }
  successCallback('В данном тексте нет запрещенных символов')
}
const text = 'Привет! Как дела ! Давно мы с тобой не виделись.'
checkTextOnErrorSymbol(text, 'а', showSuccessMessage, showErrorMessage)
