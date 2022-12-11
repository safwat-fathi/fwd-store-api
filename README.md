# image-store-front-api

## Scripts to run the project

---

to run tests:

```
yarn test
```

to start the project:

```
yarn dev
```

to build the project:

```
yarn build
```

## Endpoints to test

---

- Base URL: <http://localhost:5000/api>

### Products

- index: /products
- show: /products/{product_id}
- create: /products/create

### Orders

- show: /orders/{user_id}

### Users

- index: /users
- show: /users?user_id={id}
- create: /users/create

### DB

- server: 127.0.0.1
- port: 5432

### Env Vars

ENV=dev
PORT=5000
POSTGRES_DB=store_api
POSTGRES_TEST_DB=store_api_test
POSTGRES_USER=safwat
POSTGRES_PASSWORD=password
BCRYPT_PASSWORD=45w8sfgrk^%$sdsdww>,,,ld
SALT_ROUNDS=8
JWT_SECRET=A-STORE-APP-secretToProtectTokens@3verYrequest
