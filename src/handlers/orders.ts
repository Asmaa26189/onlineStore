// import all needed files
import { Request, Response, Application } from 'express';
import { Order, OrderStore } from '../models/order';
import { ProductStore } from '../models/product';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import { User, UserStore } from '../models/user';
import jwt_decode from 'jwt-decode';

// define user Store class to use it
const userStore = new UserStore();

// define product Store class to use it
const productStore = new ProductStore();

// define orders end points
const orderRoutes = (app: Application): void => {
  // get all orders
  app.get('/orders', tokenAuthentication, index);
  // get orders by id
  app.get('/orders/:id', tokenAuthentication, show);
  // create new order
  app.post('/orders', tokenAuthentication, create);
  // update order by id
  app.put('/orders/:id', tokenAuthentication, update);
  //delete order by id
  app.delete('/orders/:id', tokenAuthentication, deleteOrder);
  // add product to cart(order_products) table
  app.post('/orders/:id/products', tokenAuthentication, addProduct);
};
// define orderStore class to use all functions in models
const orderStore = new OrderStore();

type JWTUser = {
  user: User;
};
//get all orders
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await orderStore.index();
    //check if there is data returned
    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
// get orders by id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params) {
      // if id defined
      if (req.params.id != undefined) {
        const id = parseInt(req.params.id as string);
        // if id defined correctly
        if (id > 0) {
          const order = await orderStore.show(id);
          // check if there is returned data
          if (order) {
            res.json(order);
          } else {
            res.send('No Result');
          }
        } else {
          res.send('Please add correct id greater than 0');
        }
      } else {
        res.send('Please add your id paramter');
      }
    } else {
      res.send('Please add your id paramter');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    // check 'user_id' and 'status' is in body
    if (
      'user_id' in req.body &&
      req.body.user_id &&
      'status' in req.body &&
      req.body.status
    ) {
      // get user_id from params
      const user_id = parseInt(req.body.user_id as string);
      // set status active id not inserted from params
      let status = 'active';
      // check status is active or complete
      if (
        req.body.status != undefined &&
        req.body.status != '' &&
        (req.body.status == 'active' || req.body.status == 'complete')
      ) {
        // get status from params
        status = req.body.status as string;
      } else {
        res.send('Please enter Status(active or complete)');
      }
      const user = await userStore.show(user_id);
      // check if this user exists or not
      if (user && user != undefined) {
        //check params types
        if (typeof user_id == 'number' && typeof status == 'string') {
          // get user id to check that the user added into cart is the same user
          const jwtuser_id = (
            jwt_decode(
              (req.headers.authorization as string).split(' ')[1]
            ) as JWTUser
          ).user.id;
          if (jwtuser_id == user_id) {
            const order: Order = {
              user_id: user_id,
              status: status
            };

            const newOrder = await orderStore.create(order);
            // check if there is returned data
            if (newOrder) {
              res.json(newOrder);
            } else {
              res.send('no order created');
            }
          } else {
            res.send('This is not the same User please');
          }
        } else {
          res.send('Check your parameters type');
        }
      } else {
        res.send('This user does not exist');
      }
    } else {
      res.send('Check your parameters(user_id,status)');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    // check 'user_id' and 'status' is in body
    if (
      'id' in req.params &&
      req.params.id &&
      'user_id' in req.body &&
      req.body.user_id &&
      'status' in req.body &&
      req.body.status
    ) {
      // get id,user_id from params
      const id = parseInt(req.params.id as string);
      const user_id = parseInt(req.body.user_id as string);
      // set status active id not inserted from params
      let status = 'active';
      // check status is active or complete
      if (
        req.body.status != undefined &&
        req.body.status != '' &&
        (req.body.status == 'active' || req.body.status == 'complete')
      ) {
        status = req.body.status as string;
      } else {
        res.send('Please enter Status(active or complete)');
      }
      const user = await userStore.show(user_id);
      // check if this user exists or not
      if (user && user != undefined) {
        //check params types
        if (typeof user_id == 'number' && typeof status == 'string') {
          // get user id to check that the user added into cart is the same user
          const jwtuser_id = (
            jwt_decode(
              (req.headers.authorization as string).split(' ')[1]
            ) as JWTUser
          ).user.id;
          if (jwtuser_id == user_id) {
            const order: Order = {
              id: id,
              user_id: user_id,
              status: status
            };
            const newOrder = await orderStore.update(order);
            res.json(newOrder);
          } else {
            res.send('This is not the same User please');
          }
        } else {
          res.send('Check your parameters type');
        }
      } else {
        res.send('This user does not exist');
      }
    } else {
      res.send('Check your parameters');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    //check id in params
    if (req.params.id) {
      const id = parseInt(req.params.id as string);
      if (id > 0) {
        // return number of deleted users
        const noOfDeletedOrders = await orderStore.delete(id);
        res.json(noOfDeletedOrders);
      } else {
        res.send('your id must be more than 0');
      }
    } else {
      res.send('Check your id');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
// add product to order
const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    // check all request paramerters
    if (
      'id' in req.params &&
      req.params.id &&
      'product_id' in req.body &&
      req.body.product_id &&
      'quantity' in req.body &&
      req.body.quantity
    ) {
      // get all params
      const order_id = parseInt(req.params.id as string);
      const product_id = parseInt(req.body.product_id as string);
      const quantity = parseFloat(req.body.quantity as string);
      let user_id: number;
      //check params type
      if (
        typeof order_id == 'number' &&
        typeof quantity == 'number' &&
        typeof product_id == 'number'
      ) {
        // check if order and product exist
        const order = await orderStore.show(order_id);
        const product = await productStore.show(product_id);
        if (order && product) {
          //get user_id in this order
          user_id = order.user_id;
          // get user id from token
          const jwtuser_id = (
            jwt_decode(
              (req.headers.authorization as string).split(' ')[1]
            ) as JWTUser
          ).user.id;
          // check if same user
          if (jwtuser_id == user_id) {
            const addedProduct = await orderStore.addProduct(
              order_id,
              product_id,
              quantity
            );
            res.json(addedProduct);
          } else {
            res.send('This is not the same User please');
          }
        } else {
          res.send('please check your order id and product id');
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

export default orderRoutes;
