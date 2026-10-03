Задание

Выпадающий список — популярный элемент на современном веб-сайте. Вы когда-нибудь задумывались, как создается такой элемент? Сейчас вашей задачей будет реализация выпадающего списка на чистом JavaScript.

Стили и HTML-шаблон для выпадающего списка на ваше усмотрение.

Вам нужно добавить логику. Шаблон для выпадающего списка вам необходимо создать через JavaScript, используя document.createElement().

Шаблон выпадающего списка:

<div class="select-dropdown select-dropdown--123">
   <button class="select-dropdown__button select-dropdown__button--123"> 
      <span class="select-dropdown__text select-dropdown__text--123">Выберите элемент</span>
   </button>
  <ul class="select-dropdown__list select-dropdown__list--123"> 
     <li class="select-dropdown__list-item" data-value="1">JavaScript</li>
     <li class="select-dropdown__list-item" data-value="2">NodeJS</li>
     <li class="select-dropdown__list-item" data-value="3">ReactJS</li>
     <li class="select-dropdown__list-item" data-value="4">HTML</li>
     <li class="select-dropdown__list-item" data-value="5">CSS</li> 
  </ul> 
</div>
Для реализации выпадающего списка создайте класс CustomSelect. Конструктор данного класса принимает 2 параметра:

id - уникальный идентификатор списка. В HTML-шаблоне вместо id подставили как текст “123” (например, "select-dropdown**button--123"). Переданный параметр id должен быть подставлен вместо данного текста (например, если вы передадите в конструктор id как "my-select", то класс станет "select-dropdown**button--my-select").
options - массив вариантов выбора для выпадающего списка. Массив состоит из объектов с ключами:
value - значение атрибута data-value у элемента списка (тега <li>).
text - контент, переданный в тег элемента списка <li>. Его видит пользователь.
В классе CustomSelect все методы и поля, кроме render(), должны быть обязательно приватными.

Публичный метод render() принимает в себя параметр container (он является DOM-узлом, полученным через document.querySelector()). В этот container нужно будет добавлять всю верстку выпадающего списка.

Чтобы реализовать открытие и закрытие списка, вам необходимо повесить обработчик событий “click” на элемент по селектору .select-dropdown\_\_button. Список открыт, когда у элемента с тегом <ul> есть класс "active".

Чтобы реализовать выбор определенного элемента из выпадающего списка, также необходимо повесить обработчик событий "click". Сделать это можно двумя способами (выберите, что вам более удобно):

Повесить обработчик на каждый элемент списка с тегом <li>.
Использовать делегирование событий.
При клике нам нужно сохранить выбранный элемент в приватное поле #currentSelectedOption. С помощью него мы в дальнейшем сможем получать выбранное значение. Чтобы получить значение для этого поля, необходимо у выбранного <li> получить значение атрибута data-value. С помощью него мы можем найти нужный объект в массиве options, и уже этот объект сохранить в currentSelectedOption. Это поле будем обновлять каждый раз при выборе нового элемента меню.

Текст выбранного значения подставляйте в элемент по селектору .select-dropdown\_\_text (ключ text у объекта выбранного элемента).

Кроме этого, к элементу <li>, по которому произошел клик, добавляйте класс "selected", чтобы он становился активным и подсвечивался другим цветом. Класс "selected" может быть только у одного элемента с тегом <li>.

Чтобы получать текущее выбранное значение, создайте геттер для приватного поля #currentSelectedOption, который будет называться selectedValue. Геттер selectedValue должен возвращать currentSelectedOption - объект выбранного элемента из выпадающего списка (объект из массива options).

Для теста написанного класса используйте данный код:

const options = [
{ value: 1, text: 'JavaScript' },
{ value: 2, text: 'NodeJS' },
{ value: 3, text: 'ReactJS' },
{ value: 4, text: 'HTML' },
{ value: 5, text: 'CSS' }
];

const customSelect = new CustomSelect('123', options);
const mainContainer = document.querySelector('#container');
customSelect.render(mainContainer);
