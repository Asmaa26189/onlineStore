// import all needed files
import { Request, Response, Application } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import tokenAuthentication from '../middlewares/tokenAuthentication';

// define user Store class to use it
const userStore = new UserStore();

const userRoutes = (app: Application): void => {
  //get all users
  app.get('/users', tokenAuthentication, index);
  //get all users by id
  app.get('/users/:id', tokenAuthentication, show);
  //create new user
  app.post('/users', create);
  // update user by id
  app.put('/users/:id', tokenAuthentication, update);
  // delete user by id
  app.delete('/users/:id', tokenAuthentication, deleteUser);
  // authenticate user
  app.post('/users/:username', authenticate);
};
//get all users
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    // get all users
    const users = await userStore.index();
    if (users.length > 0) {
      res.json(users);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//get all users by id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params) {
      if (req.params.id) {
        const id = parseInt(req.params.id as string);
        // if id defined correctly
        if (id > 0) {
          const user = await userStore.show(id);
          // check if there is returned data
          if (user) {
            res.json(user);
          } else {
            res.send('No Result');
          }
        } else {
          res.send('Please add correct id greater than 0');
        }
      } else {
        res.send('Check your id');
      }
    } else {
      res.send('Please add your id paramter');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//create new user
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    // check params in request
    if (
      'username' in req.body &&
      req.body.username &&
      'firstname' in req.body &&
      req.body.firstname &&
      'lastname' in req.body &&
      req.body.lastname &&
      'password' in req.body &&
      req.body.password
    ) {
      const username = req.body.username as string;
      const firstname = req.body.firstname as string;
      const lastname = req.body.lastname as string;
      const password = req.body.password as string;
      //check parameters type
      if (
        typeof password == 'string' &&
        typeof lastname == 'string' &&
        typeof firstname == 'string' &&
        typeof username == 'string'
      ) {
        const user: User = {
          username: username,
          firstname: firstname,
          lastname: lastname,
          password: password
        };
        const newUser = await userStore.create(user);
        // check if there is returned data
        if (newUser) {
          res.json(newUser);
        } else {
          res.send('No Result');
        }
      } else {
        res.send('Check your parameters type');
      }
    } else {
      res.send('Check your parameters');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
// update user by id
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    // check params in request
    if (
      'id' in req.params &&
      req.params.id &&
      'username' in req.body &&
      req.body.username &&
      'firstname' in req.body &&
      req.body.firstname &&
      'lastname' in req.body &&
      req.body.lastname &&
      'password' in req.body &&
      req.body.password
    ) {
      const id = parseInt(req.params.id as string);
      const username = req.body.username as string;
      const firstname = req.body.firstname as string;
      const lastname = req.body.password as string;
      const password = req.body.password as string;
      //check parameters types
      if (
        typeof id == 'number' &&
        typeof password == 'string' &&
        typeof lastname == 'string' &&
        typeof firstname == 'string' &&
        typeof username == 'string'
      ) {
        const user: User = {
          id: id,
          username: username,
          firstname: firstname,
          lastname: lastname,
          password: password
        };

        const newUser = await userStore.update(user);
        // check if there is returned data
        if (newUser) {
          res.json(newUser);
        } else {
          res.send('No Result');
        }
      } else {
        res.send('Check your parameters type');
      }
    } else {
      res.send('Check your parameters');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
// delete user by id
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params && req.params.id) {
      const id = parseInt(req.params.id as string);
      // if id defined correctly
      if (id > 0) {
        // get no of deleted users
        const noOfDeletedOrders = await userStore.delete(id);
        res.json(noOfDeletedOrders);
      } else {
        res.send('Please add correct id greater than 0');
      }
    } else {
      res.send('Check your id');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
// authenticate user
const authenticate = async (req: Request, res: Response): Promise<void> => {
  try {
    //check params in request
    if (
      'username' in req.params &&
      req.params.username &&
      'password' in req.body &&
      req.body.password
    ) {
      const username = req.params.username as string;
      const password = req.body.password as string;
      // get token secret from .env file
      const tokenSecret = process.env.TOKEN_SECRET as string;
      //check params type
      if (typeof password == 'string' && typeof username == 'string') {
        const newUser = await userStore.authenticate(username, password);
        // set token
        const token = jwt.sign(
          {
            user: {
              id: newUser.id,
              username: newUser.username,
              firstname: newUser.firstname,
              lastname: newUser.lastname
            }
          },
          tokenSecret
        );
        res.json(token);
      } else {
        res.send('Check your parameters type');
      }
    } else {
      res.send('Check your parameters');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export default userRoutes;
