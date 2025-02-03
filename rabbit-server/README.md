# Rabbit backend server

## Setup
```
yarn
```

#### Postgres
Install
```
brew install postgresql
brew services start postgresql
```
Create user with password
```
psql postgres
CREATE USER rabbit_app WITH PASSWORD 'your_password!';
```

Add CREATEDB privilige to postgres user.
```
psql -h localhost -U jay -d postgres
ALTER ROLE rabbit_app WITH CREATEDB;
```

## Run dev server
```
cp .env.sample .env
```
`.env`의 mongodb+srv 항목에 MongoDB 암호 지정 (Miki-secret에 있음)
```
yarn start:dev
```

## Test with curl
#### signup
```
curl -i -X POST http://localhost:8000/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "Jay3", "password": "Miles"}'
```
```
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 229
ETag: W/"e5-PZnY9IaO9vzjHkC9C85VlpxDgBU"
Set-Cookie: session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlTV1FpT2lJMk4yRXdNall3WkRBNU9UQmlORE15TkRoaU56WTFNbUlpTENKbGJXRnBiQ0k2SWtwaGVUTWlMQ0pwWVhRaU9qRTNNemcxTkRnM05Ea3NJbVY0Y0NJNk1UY3pPRFU0TkRjME9YMC5XZTY2di1Rc3RucFp3YV9lMFJ6eEo1dlBlZWhlRklZaFR6eEtsTGFmeUNrIn0=; path=/; httponly
Date: Mon, 03 Feb 2025 02:12:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"email":"Jay3","password":"ff59b3cb9901f1519bfac68356f0e9b3af15cf98956ddff8bf2e438c694b45053db755c6ca394ef3dcc1dd7aad83e7e72a5d94b8e0343ed204373b29cbebd1a2.8b65e3ae985b1705","article":[],"_id":"67a0260d0990b43248b7652b","__v":0}%      
```

#### api/article/new
```
curl -X POST http://localhost:8000/api/article/new \
  -H "Content-Type: application/json" \
  -H "Cookie: session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlTV1FpT2lJMk4yRXdNall3WkRBNU9UQmlORE15TkRoaU56WTFNbUlpTENKbGJXRnBiQ0k2SWtwaGVUTWlMQ0pwWVhRaU9qRTNNemcxTkRnM05Ea3NJbVY0Y0NJNk1UY3pPRFU0TkRjME9YMC5XZTY2di1Rc3RucFp3YV9lMFJ6eEo1dlBlZWhlRklZaFR6eEtsTGFmeUNrIn0=" \
  -d '{"title": "New Disney", "content": "New High"}'
```
#### api/article/show
```
curl localhost:8000/api/article/show/67a026500990b43248b7652d
```

#### api/article/show with session key
```
curl -X GET http://localhost:8000/api/article/show/67a026500990b43248b7652d \
  -H "Cookie: session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlTV1FpT2lJMk4yRXdNall3WkRBNU9UQmlORE15TkRoaU56WTFNbUlpTENKbGJXRnBiQ0k2SWtwaGVUTWlMQ0pwWVhRaU9qRTNNemcxTkRnM05Ea3NJbVY0Y0NJNk1UY3pPRFU0TkRjME9YMC5XZTY2di1Rc3RucFp3YV9lMFJ6eEo1dlBlZWhlRklZaFR6eEtsTGFmeUNrIn0="
```
## Test with Postman
### Create a post
url with `POST` in method, `raw` `JSON` in body
```
localhost:8000/api/article/new
```

body
```
{
    "title": "New Disney",
    "content": "New High"
}
```
response
```
{
    "title": "New Disney",
    "content": "New High",
    "comments": [],
    "_id": "66f3c038221c32fbfdf26c60",
    "__v": 0
}
```

### Show a post
- url with `GET` in method
- `{{articleId}}`에 위 Post의 응답의 `_id` 값을 추가
```
localhost:8000/api/article/show/{{articleId}}
```

### Update a post
- url with `POST` in method, `raw` `JSON` in body
- `{{articleId}}`에 `_id` 값을 추가
```
localhost:8000/api/article/update/{{articleId}}
```

body
```
{
    "title": "New Disney",
    "content": "New Low"
}
```

### 나머지 Reqeust
- Postman History 참고.
- delete는 `DELETE` method 사용
```
localhost:8000/api/article/delete/{{articleId}}
```
```
localhost:8000/api/comment/new/{{articleId}}
{
    "userName": "Harris",
    "content": "Go World"
}
```
```
localhost:8000/api/comment/{{commentId}}/delete/{{articleId}}
```

### Signup & Signin
- `POST`
```
localhost:8000/signup
```
```
{
    "email": "Jay",
    "password": "Miles"
}
```

- `POST`
```
localhost:8000/signin
```
```
{
    "email": "Jay",
    "password": "Miles"
}
```

### Create Actor
- POST
```
localhost:8000/actor/new
```

body
```
{
    "id": 3,
    "name": "Peter"
}
```

### Show Actor
- GET
```
localhost:8000/actor/show/3
```

## Etc
- 원래 jest 관련 패키지는 devDependencies에 들어가야 하지만, 이 프로젝트에서는 테스트 코드를 작성하지 않았기 때문에 dependencies에 포함시켰습니다.

## Summarize Lecture  
[Udemy Lecture](https://www.udemy.com/course/express-typescript-nodejs-mongodb-more-the-real-path/learn/lecture/34353848#overview): Node JS-Master Node.js and Express.js with Typescript, Nestjs, Graphql

### Section 17: add authentication to our app
- Create jwt using `jwt.sign` function from `jsonwebtoken` package
  - routers/auth/signup.ts
- new mongoose.Shcema for `User` data
  - model/user.ts
-  Use also `jwt.sign` in signin.ts
   -  set `token` to request like `{ jwt: token }`
   -  This set cookie session and expiration date
- For hashing user's password, we use `athenticationService.pwdToHash` function
  - Eventually, we use `scryptAsync` for hashing with salt.
- current user middle-ware
  - `currentUser` constant fucntion using `jwt.verify` with `req.session.jwt`.
- Defile the all the common modules in `common/index.ts`.
- `/current-user` router just sending `req.currentUser`
  - This is globally defined byt `JwtPayload` and `currentUser` in middlewares/current-user.ts
- Before save `User` record into mongoose, we process hashing
  - `await authenticatationService.pwdToHash`
- `requireAuth` middleware and use the middleware in `application.ts`
    ```
    this.expressApp.use("/api/article", requireAuth, NewArticleRoute);
    this.expressApp.use(requireAuth, NewCommentRoute);
    this.expressApp.use(requireAuth, DeleteCommentRoute);\
    ```
- We use `currentUser` middleware
  - `this.expressApp.use(currentUser);`
- We create files like `index.ts` in every folders
- We just set `null` to `req.session`.