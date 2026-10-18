Задание  

Вам дана информация о пользователях, представленная в 2 вариантах: в виде массива объектов и в виде объекта с объектами:

const usersArray = [
{ id: '34rdca3eeb7f6fgeed471198', name: 'Andrew', age: 25 },
{ id: '76rdca3eeb7f6fgeed471100', name: 'Alexey', age: 15 },
{ id: '12rdca3eeb7f6fgeed4711012', name: 'Egor', age: 13 },
{ id: '32rdca3eeb7f6fgeed471101', name: 'Kate', age: 31 },
{ id: '98rdca3eeb7f6fgeed471102', name: 'Elena', age: 18 }
];

const usersObject = {
'34rdca3eeb7f6fgeed471198': {
id: '34rdca3eeb7f6fgeed471198',
name: 'Andrew',
age: 25
},
'76rdca3eeb7f6fgeed471100': {
id: '76rdca3eeb7f6fgeed471100',
name: 'Alexey',
age: 15
},
'12rdca3eeb7f6fgeed4711012': {
id: '12rdca3eeb7f6fgeed4711012',
name: 'Egor',
age: 13
},
'32rdca3eeb7f6fgeed471101': {
id: '32rdca3eeb7f6fgeed471101',
name: 'Kate',
age: 31
},
'98rdca3eeb7f6fgeed471102': {
id: '98rdca3eeb7f6fgeed471102',
name: 'Elena',
age: 18
}
};
Вам необходимо написать универсальную функцию getAdultUsers(), которая будет:

Принимать на вход массив или объект с пользователями
Выбирать из него только те элементы, у которых поле age больше или равно 18
Возвращать массив или объект со взрослыми пользователями. Если изначально был передан массив, то вернуть необходимо также массив. Если объект, то объект.
Примечание: в работе рекомендуем использовать Object.keys()

Пример работы функции:

function getAdultUsers() {
// Твоя реализация
}

console.log(getAdultUsers(usersArray));
/_
[
{ id: '34rdca3eeb7f6fgeed471198', name: 'Andrew', age: 25 },
{ id: '32rdca3eeb7f6fgeed471101', name: 'Kate', age: 31 },
{ id: '98rdca3eeb7f6fgeed471102', name: 'Elena', age: 18 }
]
_/

console.log(getAdultUsers(usersObject));
/_
{
'34rdca3eeb7f6fgeed471198': {
id: '34rdca3eeb7f6fgeed471198',
name: 'Andrew',
age: 25
},
'32rdca3eeb7f6fgeed471101': {
id: '32rdca3eeb7f6fgeed471101',
name: 'Kate',
age: 31
},
'98rdca3eeb7f6fgeed471102': {
id: '98rdca3eeb7f6fgeed471102',
name: 'Elena',
age: 18
}
}
_/
