interface SelectItem {
  value: number
  text: string
}
type SelectItemArray = SelectItem[]

class CustomSelect {
  #id: string
  #options: SelectItemArray
  #currentSelectedOption: SelectItem | null = null
  #list: HTMLElement | null = null
  #selectButton: HTMLElement | null = null

  //   выносим дефолтный текст в статику
  static #defaultText = 'Выберите элемент'

  constructor(id: string, options: SelectItemArray) {
    this.#id = id
    this.#options = options
  }

  // Главный метод render теперь чистый и состоит из подзадач (декомпозиция)
  render(container: HTMLElement | null) {
    if (!container) {
      console.error('Контейнер не найден!')
      return
    }

    const selectDropdownContainer = document.createElement('div')
    selectDropdownContainer.className = `select-dropdown select-dropdown--${this.#id}`

    this.#renderButton(selectDropdownContainer)
    this.#renderList(selectDropdownContainer)

    container.append(selectDropdownContainer)
  }

  // Приватный метод для создания кнопки
  #renderButton(container: HTMLElement) {
    const button = document.createElement('button')
    button.className = `select-dropdown__button select-dropdown__button--${this.#id}`

    const textSpan = document.createElement('span')
    textSpan.className = `select-dropdown__text select-dropdown__text--${this.#id}`
    textSpan.innerText = CustomSelect.#defaultText

    button.append(textSpan)
    button.addEventListener('click', this.#toggleList)

    this.#selectButton = button
    container.append(button)
  }

  // Приватный метод для создания списка
  #renderList(container: HTMLElement) {
    const list = document.createElement('ul')
    list.className = `select-dropdown__list select-dropdown__list--${this.#id}`

    this.#options.forEach((optionItem) => {
      const listItem = document.createElement('li')
      listItem.className = 'select-dropdown__list-item'
      listItem.dataset.value = String(optionItem.value)
      listItem.innerText = optionItem.text

      listItem.addEventListener('click', () => {
        this.#handleItemClick(optionItem, listItem)
      })

      list.append(listItem)
    })

    this.#list = list
    container.append(list)
  }

  #toggleList = () => {
    this.#list?.classList.toggle('active')
  }

  #handleItemClick = (optionItem: SelectItem, clickedElement: HTMLElement) => {
    this.#currentSelectedOption = optionItem

    // Находим текст внутри нашей кнопки и обновляем его
    const selectDropdownText = this.#selectButton?.querySelector(
      '.select-dropdown__text',
    )
    if (selectDropdownText) {
      selectDropdownText.textContent = optionItem.text
    }

    // Убираем со всех 'selected', добавляем на кликнутый
    this.#list
      ?.querySelectorAll('.select-dropdown__list-item')
      .forEach((item) => {
        item.classList.remove('selected')
      })

    clickedElement.classList.add('selected')
    this.#list?.classList.remove('active')
  }

  get selectedValue(): SelectItem | null {
    return this.#currentSelectedOption
  }
}

const options: SelectItemArray = [
  { value: 1, text: 'JavaScript' },
  { value: 2, text: 'NodeJS' },
  { value: 3, text: 'ReactJS' },
  { value: 4, text: 'HTML' },
  { value: 5, text: 'CSS' },
]

const customSelect = new CustomSelect('123', options)
const mainContainer = document.querySelector('#container') as HTMLElement | null
customSelect.render(mainContainer)

//      второй способ с не разделенным рендером и без ститического поля

// interface SelectItem {
//   value: number
//   text: string
// }
// type SelectItemArray = SelectItem[]

// class CustomSelect {
//   #id: string
//   #options: SelectItemArray
//   #currentSelectedOption: SelectItem | null = null
//   #list: HTMLElement | null = null

//   constructor(id: string, options: SelectItemArray) {
//     this.#id = id
//     this.#options = options
//     console.log('this.#id, this.#options', this.#id, this.#options)
//   }

//   render(container: HTMLElement | null) {
//     if (!container) {
//       console.error('Контейнер для селектора не найден!')
//       return
//     }

//     const selectDropdownContainer = document.createElement('div')
//     selectDropdownContainer.className = `select-dropdown select-dropdown--${this.#id}`

//     // button/span
//     const selectDropdownButton = document.createElement('button')
//     selectDropdownButton.className = `select-dropdown__button select-dropdown__button--${this.#id}`

//     const selectDropdownText = document.createElement('span')
//     selectDropdownText.className = `select-dropdown__text select-dropdown__text--${this.#id}`
//     selectDropdownText.innerText = 'Выберите элемент'
//     selectDropdownButton.append(selectDropdownText)

//     selectDropdownButton.addEventListener('click', this.#toggleList)

//     // ul/li
//     const selectDropdownList = document.createElement('ul')
//     selectDropdownList.className = `select-dropdown__list select-dropdown__list--${this.#id}`

//     this.#options.forEach((optionItem) => {
//       const listItem = document.createElement('li')
//       listItem.className = 'select-dropdown__list-item'
//       listItem.dataset.value = String(optionItem.value)
//       listItem.innerText = optionItem.text

//       listItem.addEventListener('click', () => {
//         this.#handleItemClick(optionItem, selectDropdownText, listItem)
//       })
//       selectDropdownList.append(listItem)
//     })

//     this.#list = selectDropdownList // Запоминаем в поле класса уже заполненный список

//     //
//     selectDropdownContainer.append(selectDropdownButton, this.#list)
//     console.log('Сгенерированный контейнер:', selectDropdownContainer)
//     container.append(selectDropdownContainer)
//   }

//   #toggleList = () => {
//     this.#list?.classList.toggle('active')
//     console.log(' this.#list', this.#list)
//   }

//   #handleItemClick = (
//     optionItem: SelectItem,
//     selectDropdownText: HTMLElement,
//     clickedElement: HTMLElement,
//   ) => {
//     console.log('кликнули на: ', optionItem.text)

//     this.#currentSelectedOption = optionItem // 1. Сохраняем выбранный объект
//     selectDropdownText.innerText = optionItem.text // 2. Меняем текст в кнопке

//     // 3. Убираем класс 'selected' у всех элементов листинга
//     this.#list
//       ?.querySelectorAll('.select-dropdown__list-item')
//       .forEach((item) => {
//         item.classList.remove('selected')
//       })
//     // 4. Добавляем класс 'selected' на тот пункт, по которому кликнули
//     clickedElement.classList.add('selected')

//     this.#list?.classList.remove('active') // 5. Закрываем список
//   }

//   get selectedValue(): SelectItem | null {
//     return this.#currentSelectedOption
//   }
// }

// const options: SelectItemArray = [
//   { value: 1, text: 'JavaScript' },
//   { value: 2, text: 'NodeJS' },
//   { value: 3, text: 'ReactJS' },
//   { value: 4, text: 'HTML' },
//   { value: 5, text: 'CSS' },
// ]

// const customSelect = new CustomSelect('123', options)
// const mainContainer = document.querySelector(
//   '#container',
// ) as HTMLAnchorElement | null
// customSelect.render(mainContainer)

// // --- Проверяем работу геттера ---

// const checkButton = document.createElement('button')
// checkButton.innerText = 'Узнать выбор'
// checkButton.style.marginTop = '20px'

// checkButton.addEventListener('click', () => {
//   // Здесь мы вызываем геттер selectedValue (без круглых скобок!)
//   const currentChoice = customSelect.selectedValue
//   console.log('Текущий выбор пользователя:', currentChoice)
// })

// mainContainer?.append(checkButton)
