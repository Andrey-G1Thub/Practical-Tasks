type Army = {
  archer: number
  footSoldier: number
  cavalry: number
  artillery: number
}

const attacker: Army & {
  checkChancesToWin: (defenderObject: Army) => [number, number]
  improveArmy: () => void
  attack: (defenderObject: Army) => void
} = {
  archer: 30,
  footSoldier: 55,
  cavalry: 10,
  artillery: 3,

  checkChancesToWin(defenderObject) {
    const defenderObjectLength = Object.keys(defenderObject).length
    let ourArmyChances = 0

    if (this.archer > defenderObject.archer) {
      ourArmyChances += 1
    }
    if (this.footSoldier > defenderObject.footSoldier) {
      ourArmyChances += 1
    }
    if (this.cavalry > defenderObject.cavalry) {
      ourArmyChances += 1
    }
    if (this.artillery > defenderObject.artillery) {
      ourArmyChances += 1
    }

    return [ourArmyChances, defenderObjectLength]
  },

  improveArmy() {
    this.archer += 5
    this.footSoldier += 5
    this.cavalry += 5
    this.artillery += 5
  },

  attack(defenderObject) {
    const [currentChances, maxChances] = this.checkChancesToWin(defenderObject)

    let result = (currentChances * 100) / maxChances

    if (result < 70) {
      this.improveArmy()
      alert(
        `Наши шансы равны ${currentChances}/${maxChances}. Необходимо укрепление! ${currentChances} — шансы атакующего замка на захват, ${maxChances} — максимальный шанс на захват`,
      )
    } else {
      alert('Мы усилились! Мы несомненно победим! Наши шансы высоки!')
    }
  },
}
const defender: Army = {
  archer: 33,
  footSoldier: 50,
  cavalry: 40,
  artillery: 10,
}

console.log('attacker.attack(defender', attacker.attack(defender))
console.log('attacker.attack(defender', attacker.attack(defender))
console.log('attacker.attack(defender', attacker.attack(defender))
