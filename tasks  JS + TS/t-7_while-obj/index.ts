type Hero = {
  name: string
  health: number
  heatEnemy: (enemyObject: Enemy) => void
}
type Enemy = {
  name: string
  health: number
  heatHero: (heroObject: Hero) => void
}

const hero: Hero = {
  name: 'Batman',
  health: 100,
  heatEnemy(enemyObject) {
    enemyObject.health -= 10
  },
}
const enemy: Enemy = {
  name: 'Joker',
  health: 100,
  heatHero(heroObject) {
    heroObject.health -= 10
  },
}

function getRandomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const startGame = (heroPlayer: Hero, enemyPlayer: Enemy): void => {
  while (heroPlayer.health > 0 && enemyPlayer.health > 0) {
    const result = getRandomNumberInRange(0, 1)

    if (result === 0) {
      heroPlayer.heatEnemy(enemyPlayer)
      console.log(
        `${heroPlayer.name} бьет! У ${enemyPlayer.name} осталось здоровья: ${enemyPlayer.health}`,
      )
    } else {
      enemyPlayer.heatHero(heroPlayer)
      console.log(
        `${enemyPlayer.name} бьет! У ${heroPlayer.name} осталось здоровья: ${heroPlayer.health}`,
      )
    }
  }

  if (heroPlayer.health <= 0) {
    alert(
      `${enemyPlayer.name} победил! У него осталось ${enemyPlayer.health} здоровья`,
    )
  } else {
    alert(
      `${heroPlayer.name} победил! У него осталось ${heroPlayer.health} здоровья`,
    )
  }
}
startGame(hero, enemy)
