interface User {
  id: string
  name: string
  age: number
}
type UsersArray = User[]

const usersArray: UsersArray = [
  { id: '34rdca3eeb7f6fgeed471198', name: 'Andrew', age: 25 },
  { id: '76rdca3eeb7f6fgeed471100', name: 'Alexey', age: 15 },
  { id: '12rdca3eeb7f6fgeed4711012', name: 'Egor', age: 13 },
  { id: '32rdca3eeb7f6fgeed471101', name: 'Kate', age: 31 },
  { id: '98rdca3eeb7f6fgeed471102', name: 'Elena', age: 18 },
]

// ключ — это string (ID), а значение — User
type UsersObject = Record<string, User>

const usersObject: UsersObject = {
  '34rdca3eeb7f6fgeed471198': {
    id: '34rdca3eeb7f6fgeed471198',
    name: 'Andrew',
    age: 25,
  },
  '76rdca3eeb7f6fgeed471100': {
    id: '76rdca3eeb7f6fgeed471100',
    name: 'Alexey',
    age: 15,
  },
  '12rdca3eeb7f6fgeed4711012': {
    id: '12rdca3eeb7f6fgeed4711012',
    name: 'Egor',
    age: 13,
  },
  '32rdca3eeb7f6fgeed471101': {
    id: '32rdca3eeb7f6fgeed471101',
    name: 'Kate',
    age: 31,
  },
  '98rdca3eeb7f6fgeed471102': {
    id: '98rdca3eeb7f6fgeed471102',
    name: 'Elena',
    age: 18,
  },
}

const isObject = (val: UsersObject) => {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}

const getAdultUsers = (
  arrayOrObject: UsersArray | UsersObject,
): UsersArray | UsersObject | undefined => {
  const usersObjectEntries = Object.entries(arrayOrObject)

  if (Array.isArray(arrayOrObject)) {
    return arrayOrObject.filter((user) => user.age >= 18)
  }
  if (isObject(arrayOrObject)) {
    const filteredEntries = usersObjectEntries.filter(([id, user]) => {
      return user.age >= 18
    })
    return Object.fromEntries(filteredEntries)
  }
}
console.log('getAdultUsers(usersArray)', getAdultUsers(usersArray))
console.log('getAdultUsers(usersObject)', getAdultUsers(usersObject))
