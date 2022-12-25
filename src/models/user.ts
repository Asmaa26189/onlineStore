import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// to use .env file variables
dotenv.config();
// add pepper and salt to be used in hash password
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

// define User type
export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};
// define class for all needed functions to be used
export class UserStore {
  async authenticate(username: string, password: string): Promise<User> {
    try {
      if (username && username != '' && password && password != '') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM users WHERE username = $1;';
        //exexute query
        const result = await conn.query(sql, [username]);
        //close connection
        conn.release();
        if (result.rowCount == 1) {
          const user: User = result.rows[0];
          // check password
          if (bcrypt.compareSync(password + pepper, user.password)) {
            return user;
          } else {
            throw new Error('Please check your password');
          }
        } else {
          throw new Error('Please check your username');
        }
      } else {
        throw new Error('Please check your inserted data');
      }
    } catch (err) {
      throw new Error("Couldn't authenticate this user Error message:" + err);
    }
  }

  async index(): Promise<User[]> {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql = 'SELECT * FROM users;';
      //exexute query
      const result = await conn.query(sql);
      //close connection
      conn.release();
      const usersList: User[] = result.rows;
      return usersList;
    } catch (err) {
      throw new Error("Couldn't get all users Error message:" + err);
    }
  }
  async show(id: number): Promise<User> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM users WHERE id=$1;';
        //exexute query
        const result = await conn.query(sql, [id]);
        //close connection
        conn.release();
        const user: User = result.rows[0];
        return user;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this user Error message:" + err);
    }
  }
  async create(u: User): Promise<User> {
    try {
      // database connection
      const conn = await Client.connect();
      const username = u.username;
      const firstname = u.firstname;
      const lastname = u.lastname;
      const password = u.password;
      // generate hash password
      const hashPass = bcrypt.hashSync(
        password + pepper,
        parseInt(saltRounds as string)
      );
      if (
        username &&
        username != '' &&
        password &&
        password != '' &&
        firstname &&
        firstname != '' &&
        lastname &&
        lastname != ''
      ) {
        //sql query
        const sql =
          'INSERT INTO users (username,firstname,lastname,password) VALUES($1,$2,$3,$4) RETURNING *;';
        //exexute query
        const result = await conn.query(sql, [
          username,
          firstname,
          lastname,
          hashPass
        ]);
        //close connection
        conn.release();
        const user: User = result.rows[0];
        return user;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this user Error message:" + err);
    }
  }
  async update(u: User): Promise<User> {
    try {
      // database connection
      const conn = await Client.connect();
      const id = u.id;
      const username = u.username;
      const firstname = u.firstname;
      const lastname = u.lastname;
      const password = u.password;
      const hashPass = bcrypt.hashSync(
        password + pepper,
        parseInt(saltRounds as string)
      );
      if (
        id &&
        typeof id === 'number' &&
        username &&
        username != '' &&
        password &&
        password != '' &&
        firstname &&
        firstname != '' &&
        lastname &&
        lastname != ''
      ) {
        //sql query
        const sql =
          'UPDATE users SET username=($2),firstname=($3),lastname=($4),password=($5) WHERE id=($1) RETURNING *';
        //exexute query
        const result = await conn.query(sql, [
          id,
          username,
          firstname,
          lastname,
          hashPass
        ]);
        //close connection
        conn.release();
        const user: User = result.rows[0];
        return user;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this user Error message:" + err);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'DELETE FROM users WHERE id=($1)';
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
      throw new Error("Couldn't delete this user Error message:" + err);
    }
  }
}
