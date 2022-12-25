import Client from '../database';
// define class for all needed functions to be used with join between tables
export class DashboardStore {
  // get all products in all orders
  async getAllProductsInAllOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';

      //exexute query
      const result = await conn.query(sql);

      //close connection
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error("Couldn't get all products in all orders:" + err);
    }
  }

  // get all products in order by user id
  async getAllProductsInOrderByUser(
    user_id: number,
    status: string
  ): Promise<{ name: string; price: number; order_id: string }[]> {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql =
        'SELECT name, price, order_id ,orders.status FROM products INNER JOIN order_products ON products.id = order_products.product_id INNER JOIN orders ON orders.id = order_products.order_id WHERE orders.status =$1 and orders.user_id =$2';

      //exexute query
      const result = await conn.query(sql, [status, user_id]);

      //close connection
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error('get all products in order by user id:' + err);
    }
  }

  // get all products by order id
  async getProductsByOrder(
    order_id: number
  ): Promise<{ name: string; price: number; order_id: string }[]> {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id WHERE order_products.order_id =$1 ';

      //exexute query
      const result = await conn.query(sql, [order_id]);

      //close connection
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error("Couldn't get all products by order id:" + err);
    }
  }

  //Top 5 most popular products
  async mostPopularProducts(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      // database connection
      const conn = await Client.connect();
      // if we want to use inner join
      //'select products.id ,products.name ,t.total_quantity,products.price,products.category from (SELECT product_id  ,SUM(quantity) as total_quantity FROM order_products GROUP BY product_id) as t INNER JOIN products ON products.id=t.product_id ORDER BY total_quantity DESC LIMIT 5;';
      //sql query (outer join)
      const sql =
        'select count(order_products.product_id) as count ,products.name ,products.price,products.category from order_products Full OUTER JOIN products ON products.id=order_products.product_id GROUP BY products.id ORDER BY count DESC LIMIT 5;';
      //exexute query
      const result = await conn.query(sql);

      //close connection
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error("Couldn't top 5 most popular products:" + err);
    }
  }

  //Add a users 5 most recent purchases to the data being sent back from the user show endpoint (/users/id)
  async mostRecentOrders(
    user_id: number
  ): Promise<{ productCount: number; order_id: string }[]> {
    try {
      // database connection
      const conn = await Client.connect();
      // if we want to use inner join
      //'select products.id ,products.name ,t.total_quantity,products.price,products.category from (SELECT product_id  ,SUM(quantity) as total_quantity FROM order_products GROUP BY product_id) as t INNER JOIN products ON products.id=t.product_id ORDER BY total_quantity DESC LIMIT 5;';
      //sql query (outer join)
      const sql =
        'SELECT COUNT(order_products.product_id) as productCount ,order_id  as order FROM orders JOIN order_products on order_products.order_id= orders.id  WHERE user_id=$1 GROUP BY order_id ORDER BY order_id DESC LIMIT 5;';
      //exexute query
      const result = await conn.query(sql, [user_id]);

      //close connection
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error("Couldn't 5 most recent purchases:" + err);
    }
  }
}
