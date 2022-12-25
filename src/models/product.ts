import Client from '../database';
import dotenv from 'dotenv';

// to use .env file variables
dotenv.config();

// define Product type
export type Product = {
  id?: number;
  name: string;
  price: number | string;
  category?: string;
};
// define class for all needed functions to be used
export class ProductStore {
  // get all products
  async index(): Promise<Product[]> {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql = 'SELECT * FROM products;';
      //exexute query
      const result = await conn.query(sql);
      //close connection
      conn.release();
      const productsList: Product[] = result.rows;
      return productsList;
    } catch (err) {
      throw new Error("Couldn't get all products Error message:" + err);
    }
  }
  // get product by id
  async show(id: number): Promise<Product> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM products WHERE id=$1;';
        //exexute query
        const result = await conn.query(sql, [id]);
        //close connection
        conn.release();
        const product: Product = result.rows[0];
        return product;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this product Error message:" + err);
    }
  }
  // create new product
  async create(product: Product): Promise<Product> {
    try {
      // database connection
      const conn = await Client.connect();
      const name = product.name;
      const price = product.price;
      const category = product.category;

      if (
        name &&
        name != '' &&
        price &&
        typeof price === 'number' &&
        category &&
        category != ''
      ) {
        // console.log(name);
        //sql query
        const sql =
          'INSERT INTO products (name,price,category) VALUES($1,$2,$3) RETURNING *;';
        //exexute query
        const result = await conn.query(sql, [name, price, category]);
        //close connection
        conn.release();
        const newProduct: Product = result.rows[0];
        // console.log(newProduct);
        return newProduct;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this product Error message:" + err);
    }
  }
  // update product by id
  async update(product: Product): Promise<Product> {
    try {
      // database connection
      const conn = await Client.connect();
      const id = product.id;
      const name = product.name;
      const price = product.price;
      const category = product.category;
      if (
        id &&
        typeof id === 'number' &&
        name &&
        name != '' &&
        price &&
        typeof price === 'number' &&
        category &&
        category != ''
      ) {
        //sql query
        const sql =
          'UPDATE products SET name=($2),price=($3),category=($4) WHERE id=($1) RETURNING *';
        //exexute query
        const result = await conn.query(sql, [id, name, price, category]);
        //close connection
        conn.release();
        const newProduct: Product = result.rows[0];
        return newProduct;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this product Error message:" + err);
    }
  }
  // delete product by id
  async delete(id: number): Promise<number> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'DELETE FROM products WHERE id=($1)';
        //exexute query
        const result = await conn.query(sql, [id]);
        //close connection
        conn.release();
        const numberOfDeletedRows = result.rowCount;
        return numberOfDeletedRows;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't delete this product Error message:" + err);
    }
  }
  // get product by category
  async getProductByCategory(category: string): Promise<Product> {
    try {
      if (category && typeof category === 'string') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM products WHERE category=$1;';
        //exexute query
        const result = await conn.query(sql, [category]);
        //close connection
        conn.release();
        const product: Product = result.rows[0];
        return product;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this product Error message:" + err);
    }
  }
}
