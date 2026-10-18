const createMatrix = (): number[][] => {
  let array: number[][] = []
  let counter = 1
  for (let i = 0; i < 3; i++) {
    let innerArray: number[] = []
    for (let j = 1; j < 6; j++) {
      innerArray.push(counter)
      counter++
    }
    array.push(innerArray)
  }
  return array
}

console.log(createMatrix())
