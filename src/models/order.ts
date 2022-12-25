import Client from '../database';
import dotenv from 'dotenv';

// to use .env file variables
dotenv.config();

// define Order type
export type Order = {
  id?: number;
  user_id: number;
  status: string;
};
// define OrderProducts type
export type OrderProducts = {
  id?: number;
  product_id: number;
  order_id: number;
  quantity: number;
};

// define class for all needed functions to be used
export class OrderStore {
  // get all orders
  async index(): Promise<Order[]> {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql = 'SELECT * FROM orders;';
      //exexute query
      const result = await conn.query(sql);
      //close connection
      conn.release();
      // returned result
      const ordersList: Order[] = result.rows;
      return ordersList;
    } catch (err) {
      throw new Error("Couldn't get all orders Error message:" + err);
    }
  }
  // get order by id
  async show(id: number): Promise<Order> {
    try {
      if (id && typeof id === 'number' && id > 0) {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM orders WHERE id=$1;';
        //exexute query
        const result = await conn.query(sql, [id]);
        //close connection
        conn.release();
        // returned result
        const order: Order = result.rows[0];
        return order;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this order Error message:" + err);
    }
  }
  // insert new order
  async create(order: Order): Promise<Order> {
    try {
      // database connection
      const conn = await Client.connect();
      //  define variables
      const user_id = order.user_id;
      const status = order.status;
      if (status && status != '' && user_id && typeof user_id === 'number') {
        //sql query
        const sql =
          'INSERT INTO orders (user_id,status) VALUES($1,$2) RETURNING *;';
        //exexute query
        const result = await conn.query(sql, [user_id, status]);
        //close connection
        conn.release();
        // returned result
        const newOrder: Order = result.rows[0];
        return newOrder;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this order Error message:" + err);
    }
  }
  // update order
  async update(order: Order): Promise<Order> {
    try {
      // database connection
      const conn = await Client.connect();
      //  define variables
      const id = order.id;
      const user_id = order.user_id;
      const status = order.status;
      if (
        id &&
        typeof id === 'number' &&
        status &&
        status != '' &&
        user_id &&
        typeof user_id === 'number'
      ) {
        //sql query
        const sql =
          'UPDATE orders SET user_id=($2),status=($3) WHERE id=($1) RETURNING *';
        //exexute query
        const result = await conn.query(sql, [id, user_id, status]);
        //close connection
        conn.release();
        // returned result
        const newOrder: Order = result.rows[0];
        return newOrder;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this order Error message:" + err);
    }
  }
  // delete order by id
  async delete(id: number): Promise<number> {
    try {
      if (id && typeof id === 'number' && id > 0) {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'DELETE FROM orders WHERE id=$1';
        //exexute query
        const result = await conn.query(sql, [id]);
        //close connection
        conn.release();
        // returned result
        const numberOfDeletedRows = result.rowCount;
        return numberOfDeletedRows;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't delete this order Error message:" + err);
    }
  }
  // to add product into order
  async addProduct(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<number> {
    try {
      if (
        quantity &&
        typeof quantity === 'number' &&
        order_id &&
        typeof order_id === 'number' &&
        product_id &&
        typeof product_id === 'number'
      ) {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql =
          'INSERT INTO order_products (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *;';
        //exexute query
        const result = await conn.query(sql, [quantity, order_id, product_id]);
        //close connection
        conn.release();
        // returned result
        const noOfAddedRows = result.rows.length;

        return noOfAddedRows;
      } else {
        throw new Error(
          "Couldn't add this product to this order check your inserted data"
        );
      }
    } catch (err) {
      throw new Error(
        "Couldn't add this product to this order Error message:" + err
      );
    }
  }
}
