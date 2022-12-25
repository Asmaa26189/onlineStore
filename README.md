# Storefront Backend Project

## Main function 
I'm starting this project by helping from my session leads , class rooms and slack community to get the project final result.
the project main functionality is to make apart of backend for online store with simple products, users and make orders.

## Required Technologies
Your application must make use of the following:
### Dependencies:
- npm i bcrypt@5.0.1
- npm i body-parser@1.19.0
- npm i cross-env@5.2.1
- npm i db-migrate@1.0.0-beta.18
- npm i db-migrate-pg@1.2.2
- npm i express@4.18.1
- npm i jsonwebtoken@8.5.1
- npm i jwt-decode@3.1.2
- npm i pg@8.7.3
- npm i supertest@6.2.4
- npm i dotenv@15.0.1
### DEV Dependencies:
- npm i --save-dev @types/bcrypt@5.0.0
- npm i --save-dev @types/dotenv@8.2.0
- npm i --save-dev @types/express@4.17.13
- npm i --save-dev @types/jasmine@3.6.3
- npm i --save-dev @types/jsonwebtoken@8.5.8
- npm i --save-dev @types/node@18.0.6
- npm i --save-dev @types/pg@8.6.5
- npm i --save-dev @types/supertest@2.0.12
- npm i --save-dev @typescript-eslint/eslint-plugin@5.30.7
- npm i --save-dev @typescript-eslint/parser@5.30.7
- npm i --save-dev eslint@7.12.1
- npm i --save-dev eslint-config-prettier@6.15.0
- npm i --save-dev eslint-plugin-prettier@3.4.1
- npm i --save-dev jasmine@3.6.4
- npm i --save-dev jasmine-spec-reporter@7.0.0
- npm i --save-dev jasmine-ts@0.3.0
- npm i --save-dev nodemon@2.0.19
- npm i --save-dev prettier@2.7.1
- npm i --save-dev ts-node@10.9.1
- npm i --save-dev tsc-watch@5.0.3
- npm i --save-dev typescript@4.7.4
### Scripts:
- "start": "nodemon src/server.ts",
- "watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
- "test": "set NODE_ENV=test&& npm run build  && npm run testdb-up && jasmine-ts && npm run testdb-reset",
- "tsc": "tsc",
- "build": "npx tsc",
- "lint": "eslint . --ext .ts",
- "prettier": "prettier --config .prettierrc.json src/**/*.ts --write",
- "jasmine": "jasmine",
- "devdb-up": "db-migrate up --config ./database.json --e dev",
- "devdb-reset": "db-migrate reset --config ./database.json --e dev",
- "testdb-up": "db-migrate --config ./database.json --e test up",
- "testdb-reset": "db-migrate reset --config ./database.json --e test"

## Steps :
### 1. Create Database:
**database Port** : 5432;
In psql run the following:
**for Development**
- CREATE DATABASE store_dev;
- \c store_dev

**for Test**
- CREATE DATABASE store_test;
- \c store_test

### 2. Migrations:
After run dependencies run some scripts to start :
- npm install -g yarn
**for applying yarn work as npm run**
- npm install -g db-migrate
**for migrations**
***create migrations***
- db-migrate create users --sql-file
- db-migrate create products --sql-file
- db-migrate create orders --sql-file
- db-migrate create order_products --sql-file
***write up migrations***
- users :
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL ,
    password VARCHAR(255) NOT NULL
    );
- products :
    CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    category VARCHAR(255)
    );
- orders :
    CREATE TYPE status_order AS ENUM ('active', 'complete');
    CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    status status_order NOT NULL
    );
- order_products :
    CREATE TABLE IF NOT EXISTS order_products(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id INTEGER REFERENCES orders(id) NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL
    );
***write down migrations***
- users :
   DROP Table IF EXISTS users;
- products :
    DROP Table IF EXISTS  products;
- orders :
    DROP Table IF EXISTS  orders;
    DROP TYPE status_order;
- order_products :
    DROP Table IF EXISTS  order_products;


### 2.  Run Migrations

**run up migrations**
**dev**
- npm run devdb-up
**test**
- npm run testdb-up
**run down migrations**
**dev**
- npm run devdb-reset
**test**
- npm run testdb-reset

### 3. Models
add src/models:
- product.ts [includes Product type and ProductStore class]
- user.ts [includes User type and UserStore class] 
- order.ts [includes Order type , OrderProducts type and OrderStore class] 


### 4. Express Handlers
#### users.ts
  **get all users**  
   - GET [/users]
  **get all users by id**
  - GET[/users/:id]
  **create new user**
  - POST[/users]=> create
  **update user by id**
  - PUT[/users/:id]
  **delete user by id**
  - Delete[/users/:id]
  **authenticate user**
  - POST[/users/:username]
#### products.ts 
  **get all products**
  - GET[/products]
  **get product by id**
  - GET[/products/:id]
  **get product by category**
  **[OPTIONAL] Products by category (args: product category)**
  - GET[/productsCategory/:category]
  **insert product**
  -POST[/products]
  **update product by id**
  - PUT[/products/:id]
  **delete product by id**
  - DElETE[/products/:id]

#### orders.ts 
  **get all orders**
  - GET[/orders] 
  **get orders by id**
  - GET[/orders/:id]
  **create new order**
  - POST[/orders]
   **update order by id**
  - PUT[/orders/:id]
  **delete order by id**
  - DELETE[/orders/:id]
  **add product to cart(order_products) table**
  - POST[/orders/:id/products]
#### dashboard.ts  
 **get all products in all orders**
  - GET[/dashboard]
  **get All active or complete Order by user**
  **in requirements file this 2 points:**
  **Current Order by user (args: user id) as [dashboard/:user_id/active]**
  **Completed Orders by user (args: user id) as [dashboard/:user_id/complete]**
  - GET[/dashboard/:user_id/:status]
  **5 most recent purchases**
  **Add a users 5 most recent purchases to the data being sent back from the user show endpoint (/users/id)**
  -GET[/dashboard/recentOrders/users/:user_id]

  **Top 5 most popular products**
  - GET[/dashboard/popularProducts]
 

### 5. steps after start :

(npm run test)=>to test all functions and end points
(npm run start)=> to start 

1. create user first by:
  POST[/users]
example add in body json data:
    {
"username": "admin",
"firstname": "admin",
"lastname": "admin",
"password": "admin"
}
return json data for new user
2. authorize user to get token to use it:
example: POST[/users/admin]
add in body json data:{
  "password": "admin"  
}
this  will return token
get the token and then put it in header [Authorization] ='brear tokenReturned'

4.access all functions needs token by adding this token in header & can add products:
POST[/products]
{
"name":"item1",
"price":50,
"category":"inv"
}
return json data for new product
3. note in Orders : **user in token (authorized user) must be the same user id inserted or updated**
example : after add token of same user
POST[/orders]
{
"user_id":1,
"status":"active"
}
return json data for new order
PUT[/orders/1]
{
"user_id":1,
"status":"complete"
}
return json data for updated order
POST[/orders/1/products]
{
"product_id":1,
"quantity":5
}
return json Number of Added orderss

3.some examples:


###### server 

- Test main Start page get[/]
###### users 
Users authenticate
    post[/users/admin]
    { "password": "admin"} 
    return token token ='brear '+ returnedtokens
   
Get all
    get[/users]  
    set[Authorization]= token

Get user  
    get[/users/1]  
    set[Authorization]= token

Create
    post[/users]
    set[Authorization]= token
      {
        "username": "user2",
        "firstname": "First2",
        "lastname": "Last2",
        "password": "12311"
        }
Update
      put[/users/2]   
      set[Authorization]= token
      {
        "username": "user2",
        "firstname": "First2".
        "lastname": "Last2",
        "password": "12311"
        }
Delete
    delete[/users/3]   
    set[Authorization]= token

###### products 
Products get all
    get[/products]
    set[Authorization]= token
  
Get product
    get[/products/1]
    set[Authorization]= token
Create
    post[/products]  
    set[Authorization]= token
      { "name": "item2","price": 200, "category": "inventory"}   
Get product by category
    get[/productsCategory/inventory]
    set[Authorization]= token
    
Update
    put[/products/1]
    set[Authorization]= token
      { "name": "item1", "price": 800, "category": "service"} 
   
Delete
    delete[/products/9]
    set[Authorization]= token
      
###### orders
Orders get all
    get[/orders]
    set[Authorization]= token
Get order
    get[/orders/1]   
    set[Authorization]= token
Create
    post[/orders]   
    set[Authorization]= token
      { "user_id": 1, "status": "active"} 
Update   
    put[/orders/1]   
    set[Authorization]= token
    { "user_id": 1, "status": "complete"}   
Delete
    get[/orders/5]   
    set[Authorization]= token

Add product
    post[/orders/1/products]
    set[Authorization]= token
    { "product_id": 2, "quantity": 4} 
    post[/orders/2/products]
    set[Authorization]= token
    { "product_id": 1, "quantity": 4} 
###### dashboard 
Dashboard Get all products in orders
    get[/dashboard]
    set[Authorization]= token
Get completed orders by user
    get[/dashboard/1/complete]
    set[Authorization]= token
Get active order by user    
    get[/dashboard/1/active]
    set[Authorization]= token
Get 5 recent purchases by user id
Get 5 most recent purchases
    get[/dashboard/recentOrders/users/1]
    set[Authorization]= token
Get 5 popular products 
Get popular products    
    get[/dashboard/popularProducts]
    set[Authorization]= token
      
   
  

  
