const checkQuestionAnswer = (question: string, correctAnswer: string): void => {
  const userAnswer = prompt(question)

  if (userAnswer === null) {
    alert('Вы отменили ввод')
    return
  }
  const normalizedUserAnswer = userAnswer.trim().toLowerCase()
  const normalizedCorrectAnswer = correctAnswer.trim().toLowerCase()

  if (normalizedUserAnswer === normalizedCorrectAnswer) {
    alert('Ответ верный')
  } else {
    alert('Ответ неверный')
  }
}

checkQuestionAnswer('Арбуз это фрукт или ягода?', 'Ягода')
checkQuestionAnswer('Сколько в среднем зубов у взрослого человека?', '32')
checkQuestionAnswer('Как называется самая маленькая птица в мире?', 'Колибри')

//для запуска npx tsc
