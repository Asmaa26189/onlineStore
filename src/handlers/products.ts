// import all needed files
import { Request, Response, Application } from 'express';
import { Product, ProductStore } from '../models/product';
import tokenAuthentication from '../middlewares/tokenAuthentication';

// define prodcut Store class to use it
const productStore = new ProductStore();

const productsRoutes = (app: Application): void => {
  //get all products
  app.get('/products', index);
  //get product by id
  app.get('/products/:id', show);
  // get product by category
  //[OPTIONAL] Products by category (args: product category)
  app.get(
    '/productsCategory/:category',
    tokenAuthentication,
    getProductByCategory
  );
  //insert product
  app.post('/products', tokenAuthentication, create);
  // update product by id
  app.put('/products/:id', tokenAuthentication, update);
  // delete product by id
  app.delete('/products/:id', tokenAuthentication, deleteProducts);
};
//get all products
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productStore.index();
    //check if there is data returned
    if (products.length > 0) {
      res.json(products);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//get product by id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params) {
      // if id defined
      if (req.params.id != undefined) {
        const id = parseInt(req.params.id as string);
        // if id defined correctly
        if (id > 0) {
          const product = await productStore.show(id);
          // check if there is returned data
          if (product) {
            res.json(product);
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
// get product by category
const getProductByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // check category in request
    if ('category' in req.params) {
      if (req.params.category) {
        const category = req.params.category as string;
        const product = await productStore.getProductByCategory(category);
        // check if there is returned data
        if (product) {
          res.json(product);
        } else {
          res.send('No Result');
        }
      } else {
        res.send('Check your id');
      }
    } else {
      res.send('check category in params');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//insert product
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    // check params in request
    if (
      'name' in req.body &&
      req.body.name &&
      'price' in req.body &&
      req.body.price &&
      'category' in req.body &&
      req.body.category
    ) {
      const name = req.body.name as string;
      const price = parseFloat(req.body.price as string);
      const category = req.body.category as string;
      //check parameters type
      if (typeof price == 'number' && typeof category == 'string') {
        const product: Product = {
          name: name,
          price: price,
          category: category
        };
        const newProduct = await productStore.create(product);
        // check if there is returned data
        if (newProduct) {
          res.json(newProduct);
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
// update product by id
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    if (
      'id' in req.params &&
      req.params.id &&
      'name' in req.body &&
      req.body.name &&
      'price' in req.body &&
      req.body.price &&
      'category' in req.body &&
      req.body.category
    ) {
      const id = parseInt(req.params.id as string);
      const name = req.body.name as string;
      const price = parseFloat(req.body.price as string);
      const category = req.body.category as string;
      // check params types
      if (
        typeof id == 'number' &&
        typeof name == 'string' &&
        typeof price == 'number' &&
        typeof category == 'string'
      ) {
        const product: Product = {
          id: id,
          name: name,
          price: price,
          category: category
        };
        const newProduct = await productStore.update(product);
        //check if there is returned data
        if (newProduct) {
          res.json(newProduct);
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
// delete product by id
const deleteProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params && req.params.id) {
      const id = parseInt(req.params.id as string);
      // if id defined correctly
      if (id > 0) {
        // get no of deleted products
        const noOfDeletedOrders = await productStore.delete(id);
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

export default productsRoutes;
