----------------------------Задание 1

Вы вместе с командой разработки создаете социальную сеть, где можно делится постами и оставлять комментарии к посту. Пока проект на ранней стадии, и поэтому вам нужно поработать только с отрисовкой нужных элементов.

Вам необходимо создать функцию renderPost(), которая будет получать пост по id. Функция будет принимать 1 параметр postId и с помощью данного URL: «https://jsonplaceholder.typicode.com/posts/1» получать данные о посте (в URL выше id поста равен 1).

После того, как вы получите данные о посте, требуется получить все комментарии для конкретного поста. Чтобы, например, извлечь комментарии для поста с id равным 1, вам необходимо использовать следующий url: «https://jsonplaceholder.typicode.com/comments?postId=1»

Для отображения информации о посте и комментариях на странице — используйте данный шаблон:

<div id="post" class="post">
  <h1 class="post__title">Название Поста</h1>
  <p class="post__text">Текст Поста</p>
  <b class="post__comments-text">Комментарии</b>
  <div class="post__comments">
    <div class="post-comment">
      <span class="post-comment__author">maxim@gmail.com</span>
      <span class="post-comment__text">
        laudantium enim quasi est quidem magnam voluptate ipsam eosntempora quo necessitatibusndolor quam autem quasinreiciendis et nam sapiente accusantium
      </span>
    </div>
  </div>
</div>

Каждый класс отвечает за конкретную информацию:

post**title - значение свойства title у поста
post**text - значение свойства body у поста
post-comment**authorзначение свойства email у комментария
post-comment**text значение свойства body у комментария
Протестируйте функцию renderPost(), вызвав данный код:

renderPost(1);
Примечание: обязательно не забывайте прописывать блоки .catch() (или используйте конструкцию try...catch). В них просто выводи ошибку в консоль при помощи console.error().
Для стилизации можно использовать следующий CSS-файл.

---

-------------------Задание 2

Условия задачи: "Создание нового поста" Вам нужно добавить на страницу возможность создавать новый пост через форму и отправлять его на сервер (JSONPlaceholder имитирует успешное создание).

Добавьте на страницу простую форму:

HTML-разметка:

<form id="post-form" class="post-form">
  <input type="text" id="post-title-input" placeholder="Название поста" required />
  <textarea id="post-body-input" placeholder="Текст поста" required></textarea>
  <button type="submit">Опубликовать</button>
</form>

Что должна делать ваша программа:
1 Перехват отправки формы: Повесьте обработчик события submit на форму (post-form). Не забудьте про event.preventDefault(), чтобы страница не перезагружалась при отправке.

2 Сбор данных: Считайте значения из инпутов (название и текст поста).

3 Функция отправки (sendNewPost): Создайте асинхронную функцию, которая будет делать fetch запрос на тот же базовый URL ([https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)), но с настройками для POST:

method: 'POST'

headers: { 'Content-Type': 'application/json; charset=UTF-8' }

body: JSON.stringify({ title, body, userId: 1 }) (переводим объект в JSON-строку).

4 Обработка ответа:

Оберните всё в try...catch...finally.

Проверьте response.ok.

Получите ответ сервера через await response.json() (сервер вернет созданный объект с присвоенным id, например { id: 101, title: '...', body: '...' }).

5 Отрисовка: Вызовите уже готовую функцию createPost для только что созданного поста (поскольку у фейкового сервера комментариев к новому посту не будет, можете передать пустой массив [] для комментариев).

---------------------3 задача:

удаление поста

---------------------4 задача:
обновление поста

---------------------5 задача:
добавление удаление модального окна

запуск
cd "tasksJS+TS"
npm run task-15
