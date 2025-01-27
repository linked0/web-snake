# Rabbit backend server

## Setup
```
yarn
```

## Run dev server
```
cp .env.sample .env
```
`.env`의 mongodb+srv 항목에 MongoDB 암호 지정 (Miki-secret에 있음)
```
yarn dev
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

## Etc
- 원래 jest 관련 패키지는 devDependencies에 들어가야 하지만, 이 프로젝트에서는 테스트 코드를 작성하지 않았기 때문에 dependencies에 포함시켰습니다.