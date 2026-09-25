type Applicants = {
  [key: string]: {
    name: string
    age: number
  }
}
type WinnerObject = {
  prize: string
}
const todaysWinner: WinnerObject = {
  prize: '10 000$',
}

const winnerApplicants: Applicants = {
  '001': {
    name: 'Максим',
    age: 25,
  },
  '201': {
    name: 'Светлана',
    age: 20,
  },
  '304': {
    name: 'Екатерина',
    age: 35,
  },
}
function getRandomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min
}

const getWinner = (
  applicants: Applicants,
  winnerObject: WinnerObject,
): WinnerObject & { name: string; age: number } => {
  const applicantKeys = Object.keys(applicants)
  const randomIdx = getRandomNumberInRange(0, applicantKeys.length)
  const winnerId = applicantKeys[randomIdx]
  const winner = applicants[winnerId as keyof typeof applicants]
  return { ...winnerObject, ...winner } as WinnerObject & {
    name: string
    age: number
  }
}

const resultWinner = getWinner(winnerApplicants, todaysWinner)
console.log('resultWinner', resultWinner)
// { prize: '10 000$', name: 'Максим', age: 25 }
