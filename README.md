# Приложение - Учёт расходов

Репозиторий проекта: [github](https://github.com/Mikhail-Novikov/Mikhail-Novikov.github.io.git)

- [Технологии проекта](#технологии-проекта)
- [Разработка](#разработка)
- [Структура проекта](#структура-проекта)

### Технологии проекта

- [React](https://ru.reactjs.org/)
- [Redux](https://redux.js.org/)
- [@reduxjs/toolkit](https://redux-toolkit.js.org/)
- [Redux-saga](https://redux-saga.js.org/)
- [React-router-dom](https://reactrouter.com/web/guides/quick-start)
- [connected-react-router](https://github.com/supasate/connected-react-router/)
- [history](https://github.com/ReactTraining/history)

### Разработка

- [Запуск проекта](#Запуск-проекта)
- [NPM скрипты](#npm-скрипты)

### Запуск проекта

```javascript
npm i
```

```javascript
npm start
```

```javascript
http://localhost:3000/#/
```

### NPM скрипты

| Скрипт        | Описание                                                                                           |
|:--------------| -------------------------------------------------------------------------------------------------- |
| npm run start | запуск проекта на http://localhost:3000/#/                                                         |
| npm run build | сборка проекта с настройками для прода, не будет выполнено, если не пройдёт проверка `npm run lint` |
| npm run check | проверка кода проекта на ошибки                                                              |
| npm run test  | запуск тестов                                                                                      |


### Структура проекта

```
+---src
|   +---common                                                : ОБЩИЕ ЭЛЕМЕНТЫ ПРИЛОЖЕНИЯ
|   |
|   +---context                                               : КОНТЕКСТЫ ПРИЛОЖЕНИЯ
|   |
|   +---features                                              : МОДУЛИ ПРОЕКТА
|   |
|   +---images                                                : КАРТИНКИ ПРОЕКТА
|   |
|   +---layouts                                               : МАКЕТЫ ПРОЕКТА
|   |
|   +---pages                                                 : КОМПОНЕНТЫ СТРАНИЦ
|   |
|   \---store                                                 : НАСТРОЙКИ REDUX
```
