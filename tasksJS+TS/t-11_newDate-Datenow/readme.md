Задание  
Ваш заказчик - визовый центр. У них есть база данных клиентов, но нет скрипта, который бы автоматизировал процесс выдачи виз. Поэтому визовый центр попросил вас помочь как веб-разработчика взять эту задачу на себя.

Вам необходимо создать функцию allowVisa(), которая будет фильтровать переданный массив из клиентов визового центра. Она принимает в себя массив клиентов. Каждый клиент — это объект с параметрами firstName (имя клиента), lastName (фамилия клиента), criminalRecord (тип данных boolean, есть ли судимость), passportExpiration (тип данных string, дата истечения срока действия паспорта).

Функция allowVisa() должна возвращать отфильтрованный массив people, чтобы он удовлетворял следующим условиям:

Текущая дата должна быть меньше свойства passportExpiration.
У клиента не должно быть судимости, т.е. значение свойства criminalRecord должно равняться false.
Для теста функции используйте данный код:

const peopleWithVisa = [
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
];

function allowVisa() {
// Your code...
}

const result = allowVisa(peopleWithVisa);
console.log('result', result);
