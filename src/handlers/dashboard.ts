// import all needed files
import { DashboardStore } from '../services/dashboad';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import { Request, Response, Application } from 'express';
import { UserStore } from '../models/user';

// define user Store class to use it
const userStore = new UserStore();

// define dashboard end points
const dashboardRoutes = (app: Application): void => {
  // get all products in all orders
  app.get('/dashboard', tokenAuthentication, getAllProductsInAllOrders);
  // get All active or complete Order by user
  // in requirements file this 2 points:
  //Current Order by user (args: user id) as [dashboard/:user_id/active]
  //[OPTIONAL] Completed Orders by user (args: user id) as [dashboard/:user_id/complete]
  app.get(
    '/dashboard/:user_id/:status',
    tokenAuthentication,
    getAllProductsInOrderByUser
  );

  // 5 most recent purchases
  // Add a users 5 most recent purchases to the data being sent back from the user show endpoint (/users/id)
  app.get('/dashboard/recentOrders/users/:user_id', tokenAuthentication, mostRecentOrders);

  // Top 5 most popular products
  // [OPTIONAL] Top 5 most popular products
  app.get(
    '/dashboard/popularProducts',
    tokenAuthentication,
    mostPopularProducts
  );
};

// define dashboard class dashboard store to use all functions in models
const dashboardStore = new DashboardStore();

// get all products in all orders end point
const getAllProductsInAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allProductsInOrders =
      await dashboardStore.getAllProductsInAllOrders();
    //check if there is data returned
    if (allProductsInOrders.length > 0) {
      res.json(allProductsInOrders);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
// get All active or complete Order by user
const getAllProductsInOrderByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // check if user_id and status in parameters or not
    if ('user_id' in req.params && 'status' in req.params) {
      // get user_id and status from params
      const user_id = parseInt(req.params.user_id as string);
      const status = req.params.status as string;
      // check if data in params add with correct values
      if (user_id && user_id != undefined && status && status != undefined) {
        // check if this user is already inserted or not
        const user = await userStore.show(user_id);
        if (user != undefined) {
          // check the 2 values of status for the order (active or complete) only
          if (status == 'active' || status == 'complete') {
            const allProductsInOrders =
              await dashboardStore.getAllProductsInOrderByUser(user_id, status);
            //check if there is data returned
            if (allProductsInOrders.length > 0) {
              res.json(allProductsInOrders);
            } else {
              res.send('No Result');
            }
          } else {
            res.send('Status must be active or complete');
          }
        } else {
          res.send('This user does not exist');
        }
      } else {
        res.send('Please add all correct and needed parameters');
      }
    } else {
      res.send('Please add all correct and needed parameters');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
// get most 5 popular products
const mostPopularProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // get the top 5 paid products with there quantity ;
    const popularProducts = await dashboardStore.mostPopularProducts();
    //check if there is data returned
    if (popularProducts.length > 0) {
      res.json(popularProducts);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
// 5 most recent purchases
const mostRecentOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = parseInt(req.params.user_id as string);
    // get 5 most recent purchases ;
    const popularProducts = await dashboardStore.mostRecentOrders(user_id);
    //check if there is data returned
    if (popularProducts.length > 0) {
      res.json(popularProducts);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export default dashboardRoutes;
