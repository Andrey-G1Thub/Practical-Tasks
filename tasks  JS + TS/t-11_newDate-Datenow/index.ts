interface User {
  firstName: string
  lastName: string
  criminalRecord: boolean
  passportExpiration: string
}
type PeopleWithVisa = User[]

const peopleWithVisa: PeopleWithVisa = [
  {
    firstName: 'Stasia',
    lastName: 'Ward',
    criminalRecord: true,
    passportExpiration: '19.06.2040',
  },
  {
    firstName: 'Elliot',
    lastName: 'Baker',
    criminalRecord: false,
    passportExpiration: '04.06.2041',
  },
  {
    firstName: 'Leighann',
    lastName: 'Scott',
    criminalRecord: true,
    passportExpiration: '31.07.2039',
  },
  {
    firstName: 'Nick',
    lastName: 'Pop',
    criminalRecord: false,
    passportExpiration: '31.12.2010',
  },
]

function parseCustomDate(str: string): Date {
  const [day, month, year] = str.split('.')
  return new Date(Number(year), Number(month) - 1, Number(day))
}

const allowVisa = (peopleList: PeopleWithVisa) => {
  const currentDate = new Date()

  const filteredUsers = peopleList.filter((user) => {
    const dateUser = user.passportExpiration
    const isCriminalRecord = user.criminalRecord === false

    const targetDate = parseCustomDate(dateUser)
    return currentDate < targetDate && isCriminalRecord
  })
  return filteredUsers
}

const result = allowVisa(peopleWithVisa)
console.log('result', result)
console.log(`Можно пропустить только: ${result.length} человек`)

//------------ еще решение через милисекунды Date.now()

// const allowVisa = (people) => {
//   return people.filter((person) => {
//     const splittedExpirationDate = person.passportExpiration.split('.')
//     const year = splittedExpirationDate.at(-1)
//     const month = splittedExpirationDate[1]
//     const date = splittedExpirationDate[0]
//     const passportExpirationDate = new Date(year, month - 1, date)
//     return (
//       passportExpirationDate.getTime() > Date.now() && !person.criminalRecord
//     )
//   })
// }

// console.log(allowVisa(peopleWithVisa))
