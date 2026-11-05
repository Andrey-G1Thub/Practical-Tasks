## 1. Какие технологии нам понадобятся

TypeScript - Типизация JavaScript
tsx - Запуск TypeScript без предварительной компиляции
Express - HTTP-сервер
EJS - Шаблонизация HTML
Chalk - Цветной вывод в консоль
Yargs - Работа с CLI
Nodemon - Автоматический перезапуск сервера

# Дополнительно понадобятся типы:

- @types/node
- @types/express
- @types/ejs
- @types/yargs

## 2. Сначала создадим конфигурацию

cd tasksNode+TS
npm init - ручное создание package.json

## 3 Затем установим основные зависимости:

npm install express ejs chalk@4.1.2 yargs

# И инструменты разработки:

npm install -D typescript tsx nodemon @types/node @types/express @types/ejs @types/yargs

# 4. Проверим окружение

node -v
npm -v
npm ls --depth=0

# установим пока старые версии yargs и ejs и node:

npm install yargs@17 ejs@3.1.10

npm install -D @types/node@22

# Ещё один принципиальный момент: серверный TypeScript и клиентский TypeScript работают в разных средах:

- Сервер — Node.js.
- Клиент — браузер.

# 5 Настраиваем TypeScript

{
"compilerOptions": {
"target": "ES2022",
"module": "NodeNext",
"moduleResolution": "NodeNext",
"strict": true,
"esModuleInterop": true, //Упрощает импорт CommonJS-модулей
"skipLibCheck": true, //Пропускает проверку деклараций типов зависимостей
"forceConsistentCasingInFileNames": true
}
}

# 6 esbuild — это быстрый инструмент сборки, который умеет: используем его только для преобразования клиентского TypeScript в JavaScript.

- преобразовывать TypeScript в JavaScript;
- собирать несколько файлов в один;
- выполнять минификацию кода;
- работать с импортами и зависимостями.
  npm install -D esbuild
