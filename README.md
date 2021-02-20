Репозиторий для бэкенда movies-explorer
### Movie Explorer REST API 

Backend для Movie Explorer на Node.js (Express).
* REST API доступно по: [`https://api.movies.students.nomoredomains.work`](https://api.movies.students.nomoredomains.work)
___

#### Скрипты:
##### Запустить **app.js**:
`npm run start`
##### Запустить **app.js c hot-reload** (nodemon):
`
npm run dev
`
##### Проверка линтером (Eslint):
`
npm run lint
`
##### Исправление ошибок линтером:
`
npm run lint:fix
`
___
#### Endpoints:


##### Регистрация и Авторизация:
```
# создаёт пользователя с переданными в теле
# email, password и name
POST /signup

# проверяет переданные в теле почту и пароль
# и возвращает JWT
POST /signin 
```

##### Пользователи и Фильмы:
```
# возвращает информацию о пользователе (email и имя)
GET /users/me

# обновляет информацию о пользователе (email и имя)
PATCH /users/me

# возвращает все сохранённые пользователем фильмы
GET /movies

# создаёт фильм с переданными в теле
# country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail 
POST /movies

# удаляет сохранённый фильм по _id
DELETE /movies/movieId 
```
___
#### Модели:
##### `user` 
* **email** — почта пользователя. *Email String*
* **name** — имя пользователя, например: Александр или Мария. *String*
##### `movie`
* **country** — страна создания фильма. *String*
* **director** — режиссёр фильма. *String*
* **duration** — длительность фильма. *Number*
* **year** — год выпуска фильма. *String*
* **description** — описание фильма. *String*
* **image** — ссылка на постер к фильму. *URL String*
* **trailer** — ссылка на трейлер фильма. *URL String*
* **thumbnail** — миниатюрное изображение постера к фильму. *URL String*
* **nameRU** — название фильма на русском языке. *String*
* **nameEN** — название фильма на английском языке. *String*

___
#### Зависимости:
* **limiter** — Ограничитель запросов на сервер с одного IP (конфиг в utils/rateLimits);
* **helmet** — Защита заголовков от уязвимостей;
* **cors** — CORS;
* **bodyParser** — Парсер;

___
#### Middlewares:
* **authProtected** — Защита роутов авторизацией;
* **celebrateErrorHandler** — Кастомные ошибки для Celebrate
* **errorHandler** — Обработчик ошибок;
* **logger** — Логирование;
___
#### Логирование:
* Запросы и ответы записываются в файл `logs/request.log`
* Ошибки записываются в файл `logs/error.log`
___
#### Ошибки:
* Для обработки ошибок используется middleware `errorHandler`.
* Для обработок ошибок валидатора входящих запросов JOI / celebrate используется  `celebrateErrorHandler`. 
* Если нужно проверить работу валидатора запросов JOI / Celebrate
и получить подробную ошибку:
1. Расскоментить строку:
`const { errors } = require('celebrate');`
2. Закомментить `celebrateErrorHandler;`
3. Расскоментить `app.use(errors());`
