# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index[/products] =>get
- Show[/products/:id] =>get(args: id)
- Create[/products] =>post(args: name , price , category) [token required]
- Update[/products/:id] =>put(args: id, name , price , category) [token required]
- Delete[/products/:id] =>delete(args: id) [token required]
- [OPTIONAL] Products by category [/productsCategory/:category] => get(args: category) [token required]


#### Users
- Index[/users] =>get[token required]
- Show[/users/:id] =>get(args: id)[token required]
- Create[/users] =>post(args: username , firstname , lastname, password) 
- Update[/users/:id] =>put(args: id, username , firstname , lastname, password) [token required]
- Delete[/users/:id] =>delete(args: id) [token required]
- Authenticate[/users/:username] =>post (args:username , password)

#### Orders

- Index [/orders] =>get[token required]
- Show[/orders/:id] =>get(args: id)[token required]
- Create[/orders] =>post(args: user_id,status) [token required] 
- Update[/orders/:id] =>put(args: id,user_id,status) [token required]
- Delete[/orders/:id] =>delete(args: id) [token required]
- Add Product[/orders/:id/products] =>post (args:id,product_id,quantity)[token required]
**Important Note** in orders create , update ,add product user_id should be the same of user_id in token other wise cannot add the order or product in order [authorize your user first]

#### Dashboard
- [OPTIONAL] Top 5 most popular products [/dashboard/popularProducts] =>get
- Current Order by user [/dashboard/:user_id/active]=>get (args: user_id)[token required]
- [OPTIONAL] Completed Orders by user [/dashboard/:user_id/complete]=>get (args: user_id)[token required]
- Get all Products in all Orders [/dashboard]=>get[token required]
- [OPTIONAL] Add a users 5 most recent purchases to the data [/dashboard/recentOrders/users/:user_id]=>get[token required]

## Data Shapes
#### Product
- id => number
- name => string
- price =>  number | string
- category => string

#### User
- id => number
- username => string
- firstName => string
- lastName => string
- password => string

#### Order
- id => number
- user_id => number
- status of order (active or complete) => string

#### order_product
  - id => number
  - product_id => number
  - order_id => number
  - quantity => number
