type MathResult = number | boolean | string

const operators = ['>', '<', '=', '+', '-', '\*', '/']

const getMathResult = (expression: (string | number)[]): MathResult => {
  if (expression.length < 3) {
    return 'Ошибка'
  }

  let cleanExpression = expression
  if (expression.length > 3) {
    cleanExpression = expression.filter((item) => {
      const isOpertor = typeof item === 'string' && operators.includes(item)
      const isNumber =
        !isNaN(Number(item)) && item !== '' && typeof item !== 'boolean'
      return isOpertor || isNumber
    })
  }

  if (cleanExpression.length !== 3) {
    return 'Ошибка'
  }

  const [rawEl1, operator, rawEl2] = cleanExpression

  if (
    typeof operator !== 'string' ||
    !operators.includes(operator) ||
    isNaN(Number(rawEl1)) ||
    isNaN(Number(rawEl2))
  ) {
    return 'Ошибка'
  }

  const num1 = Number(rawEl1)
  const num2 = Number(rawEl2)

  switch (operator) {
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case '*':
      return num1 * num2
    case '/':
      return num2 === 0 ? 'Ошибка' : num1 / num2 // Защита от деления на ноль
    case '>':
      return num1 > num2
    case '<':
      return num1 < num2
    case '=':
      return num1 === num2
    default:
      return 'Ошибка'
  }
}

console.log(getMathResult(['200', '+', 300])) // 500
console.log(getMathResult(['20', '-', '5'])) // 15
console.log(getMathResult([100, '/', 100])) // 1
console.log(getMathResult([2, '-', 2])) //  0
console.log(getMathResult(['5', '>', '10'])) // false
console.log(getMathResult(['5', '<', '10'])) // true
console.log(getMathResult(['1', '=', 1])) // true
console.log(getMathResult(['100', 'hello', 'javascript', 'help200', '+', 4])) // 104 (после фильтрации ['100', '+', 4])
console.log(getMathResult(['1', '**', 1])) // 'Ошибка'
console.log(getMathResult(['+', '100', 10])) // 'Ошибка'
