type Suspects = Record<string, string[]>

const getKiller = (suspectInfo: Suspects, deadPeople: string[]) => {
  let killerName = ''

  const suspectEntries = Object.entries(suspectInfo)

  suspectEntries.forEach(([name, seenPeople]) => {
    const isKiller = deadPeople.every((deadPerson: any) =>
      seenPeople.includes(deadPerson),
    )

    if (isKiller) {
      killerName = name
    }
  })

  return killerName
}

console.log(
  getKiller(
    {
      James: ['Jacob', 'Bill', 'Lucas'],
      Johnny: ['David', 'Kyle', 'Lucas'],
      Peter: ['Lucy', 'Kyle'],
    },
    ['Lucas', 'Bill'],
  ),
) // Убийца James

console.log(
  getKiller(
    {
      Brad: [],
      Megan: ['Ben', 'Kevin'],
      Finn: [],
    },
    ['Ben'],
  ),
) // Убийца Megan

//-----с методом--------- .find()
// const getKiller = (
//   suspectInfo: Record<string, string[]>,
//   deadPeople: string[],
// ): string | undefined => {
//   const suspectEntries = Object.entries(suspectInfo)

//   const killer = suspectEntries.find(([name, seenPeople]) => {
//     return deadPeople.every((deadPerson) => seenPeople.includes(deadPerson))
//   })

//   return killer ? killer[0] : undefined
// }
