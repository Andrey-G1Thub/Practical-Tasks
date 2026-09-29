Задание

В заданиях ранее вы реализовали логику для двух словарей, и они работают прекрасно. Но тут к вам приходит старший разработчик и говорит, что необходимо добавить сокрытие.

Вы конечно же соглашаешься со старшим разработчиком. Он посоветовал вам сделать поля name и words приватными. Реализуйте это с помощью знака решетки #.

Усовершенствуйте свое решение из задания выполненого ранее: class Dictionary {
constructor(name) {
this.name = name
this.words = {}
}

add(word, description) {
if (!this.words[word]) {
this.words[word] = {
word,
description,
}
}
}

remove(word) {
delete this.words[word]
}

get(word) {
return this.words[word]
}

showAllWords() {
Object.values(this.words).forEach((wordItem) => {
console.log(`${wordItem.word} - ${wordItem.description}`)
})
}
}

class HardWordsDictionary extends Dictionary {
add(word, description) {
if (!this.words[word]) {
this.words[word] = {
word,
description,
isDifficult: true,
}
}
}
}

Теперь вам необходимо добавить геттеры и сеттер в класс Dictionary, чтобы иметь доступ до приватных переменных.

Для #name создайте геттер mainName (через ключевое слово get) и сеттер mainName (через ключевое слово set).

Для #words создайте геттер allWords (через ключевое слово get).

Также создайте \_addNewWord() - обычный метод класса, который будет добавлять новое слово в приватный объект #words (вместо сеттера). Он должен принимать:

wordKey - слово (в данном случае это будет ключ, по которому добавляем в объект #words), тип данных строка.
wordObj - объект вида:
{
word: 'word',
description: 'description',
isDifficult: true // добавляется если слово сложное
}
Метод \_addNewWord() должен только создавать новое слово в объекте #words без каких-либо проверок. Он реализуется без set, так как:

set не может принимать в себя больше 1-го параметра
set в данном случае логичнее использовать для установки полностью нового значения, а не дополнения предыдущего
Метод \_addNewWord() будет использоваться в методе add(). Мы их разделили, так как у них разная зона ответственности:

\_addNewWord() - отвечает за просто добавление слова в объект. Он используется только внутри классов в методе add().
add() - проверяет, есть ли уже данное слово в словаре, и, если слова нет, то вызывает метод \_addNewWord(), чтобы добавить новое слово. Метод add() будет использоваться (вызываться) у экземпляра класса для безопасного добавления новых слов (пример ниже).
Вам необходимо исправить логику для классов Dictionary и HardWordsDictionary

Итоговый код тестируйте на данном примере:

const hardWordsDictionary = new HardWordsDictionary('Сложные слова');

hardWordsDictionary.add('дилетант', 'Тот, кто занимается наукой или искусством без специальной подготовки, обладая только поверхностными знаниями.');

hardWordsDictionary.add('неологизм', 'Новое слово или выражение, а также новое значение старого слова.');

hardWordsDictionary.add('квант', 'Неделимая часть какой-либо величины в физике.');

hardWordsDictionary.remove('неологизм');

hardWordsDictionary.showAllWords();

console.log(hardWordsDictionary.mainName); // Сложные слова
hardWordsDictionary.mainName = 'Новый Словарь';
console.log(hardWordsDictionary.mainName); // Новый Словарь
console.log(hardWordsDictionary.allWords); // выводит объект в котором есть слова
// дилетант и квант
