interface WordItem {
  word: string
  description: string
  isDifficult?: boolean
}

class Dictionary {
  #name: string
  #words: Record<string, WordItem>

  constructor(name: string) {
    this.#name = name
    this.#words = {}
    console.log(`Создан новый словарь с именем: "${this.#name}"`)
  }

  get mainName(): string {
    return this.#name
  }
  set mainName(newName: string) {
    this.#name = newName
  }

  get allWords(): Record<string, WordItem> {
    return this.#words
  }

  protected _addNewWord(wordKey: string, wordObj: WordItem): void {
    this.#words[wordKey] = wordObj
  }

  add(word: string, description: string): void {
    if (!this.#words[word]) {
      this._addNewWord(word, {
        word,
        description,
      })
      console.log(
        `[ADD]: Слово "${word}" успешно добавлено. Текущий словарь:`,
        this.#words,
      )
    }
  }

  remove(word: string): void {
    delete this.#words[word]
    console.log(`[REMOVE]: Слово "${word}" удалено. Остаток:`, this.#words)
  }

  get(word: string): WordItem | undefined {
    return this.#words[word]
  }

  showAllWords(): void {
    Object.values(this.#words).forEach((wordItem) => {
      console.log(`${wordItem.word} - ${wordItem.description}`)
    })
  }
}

class HardWordsDictionary extends Dictionary {
  add(word: string, description: string): void {
    if (!this.get(word)) {
      this._addNewWord(word, {
        word,
        description,
        isDifficult: true,
      })
    }
  }
}

const hardWordsDictionary = new HardWordsDictionary('Сложные слова')
hardWordsDictionary.add(
  'дилетант',
  'Тот, кто занимается наукой или искусством без специальной подготовки, обладая только поверхностными знаниями.',
)
hardWordsDictionary.add(
  'неологизм',
  'Новое слово или выражение, а также новое значение старого слова.',
)
hardWordsDictionary.add(
  'квант',
  'Неделимая часть какой-либо величины в физике.',
)

hardWordsDictionary.remove('неологизм')
hardWordsDictionary.showAllWords()

// дилетант - Тот, кто занимается наукой или искусством без специальной подготовки, обладая только поверхностными знаниями.
// квант - Неделимая часть какой-либо величины в физике.
// const targetWord = hardWordsDictionary.get('квант')
// console.log('Результат поиска слова:', targetWord)

console.log('hardWordsDictionary.mainName', hardWordsDictionary.mainName) // Сложные слова
hardWordsDictionary.mainName = 'Новый Словарь'
console.log('hardWordsDictionary.mainName', hardWordsDictionary.mainName) // Новый Словарь
console.log('hardWordsDictionary.allWords', hardWordsDictionary.allWords) // выводит объект в котором есть слова
// дилетант и квант
