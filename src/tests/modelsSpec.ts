// here we can test all models functions
import { Order, OrderStore } from '../models/order';
import { User, UserStore } from '../models/user';
import { Product, ProductStore } from '../models/product';
import { DashboardStore } from '../services/dashboad';
// define some types
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const dashboardStore = new DashboardStore();
//Test users functions
describe('Test users functions', () => {
  // insert
  it('Insert user', async () => {
    const user: User = {
      username: 'user1',
      firstname: 'First',
      lastname: 'Last',
      password: '123'
    };

    const result: User = (await userStore.create(user)) as User;
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result).toBeDefined();
    expect(result.username).toEqual('user1');
  });
  //update
  it('Update user', async () => {
    const user: User = {
      id: 1,
      username: 'user1',
      firstname: 'FirstEdit',
      lastname: 'LastEdit',
      password: '234'
    };
    const result = await userStore.update(user);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.username).toEqual('user1');
  });
  //select all users
  it('Get all user', async () => {
    const result = await userStore.index();
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.length).toEqual(1);
  });
  // select user by id
  it('Get user by id', async () => {
    const id = 1;
    const result = await userStore.show(id);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.username).toEqual('user1');
  });
  // authenticate user'
  it('Authenticate user', async () => {
    const username = 'user1';
    const password = '234';
    const result = await userStore.authenticate(username, password);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.username).toEqual('user1');
  });
});
// Test products functions
describe('Test products functions', async () => {
  // insert product
  it('Insert product', async () => {
    const product: Product = {
      name: 'item1',
      price: 10.0,
      category: 'service'
    };
    const checkProduct = {
      id: 1,
      name: 'item1',
      price: '10.00',
      category: 'service'
    };
    const result = await productStore.create(product);
    // console.log(result);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result).toEqual(checkProduct);
  });
  // update products
  it('Update product', async () => {
    const product: Product = {
      id: 1,
      name: 'item1Edit',
      price: 500.0,
      category: 'inventory'
    };
    const checkProduct: Product = {
      id: 1,
      name: 'item1Edit',
      price: '500.00',
      category: 'inventory'
    };
    const result = await productStore.update(product);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result).toEqual(checkProduct);
  });
  // select all products
  it('Get all product', async () => {
    const result = await productStore.index();
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.length).toEqual(1);
  });
  it('Get product by id', async () => {
    const id = 1;
    const result = await productStore.show(id);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.id).toEqual(1);
  });
});
// Test orders functions
describe('Test orders functions', async () => {
  //insert
  it('Insert order', async () => {
    const order: Order = {
      user_id: 1,
      status: 'active'
    };
    const checkOrder: Order = {
      id: 1,
      user_id: 1,
      status: 'active'
    };
    const result = await orderStore.create(order);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result).toEqual(checkOrder);
  });
  //update
  it('Update order', async () => {
    const order: Order = {
      id: 1,
      user_id: 1,
      status: 'complete'
    };

    const result = await orderStore.update(order);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result).toEqual(order);
  });
  //get all
  it('Get all order', async () => {
    const result = await orderStore.index();
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.length).toEqual(1);
  });
  // get by id
  it('Get order by id', async () => {
    const id = 1;
    const result = await orderStore.show(id);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.id).toEqual(1);
  });

  //  add products to order
  it('add product to order', async () => {
    const order_id = 1;
    const product_id = 1;
    const quantity = 23;
    const result = await orderStore.addProduct(order_id, product_id, quantity);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result).toEqual(1);
  });
});

// Test dashboard functions
describe('Test dashboard functions', async () => {
  //get all products in all orders
  it('Get all products in all orders', async () => {
    const result = await dashboardStore.getAllProductsInAllOrders();
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.length).toEqual(1);
  });
  //get all products in order by user id and status
  it('Get all products in order by user id and status', async () => {
    const user_id = 1;
    const status = 'complete';
    const result = await dashboardStore.getAllProductsInOrderByUser(
      user_id,
      status
    );
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.length).toEqual(1);
  });

  //  get all products by order id
  it('Get all products by order id', async () => {
    const order_id = 1;
    const result = await dashboardStore.getProductsByOrder(order_id);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.length).toEqual(1);
  });

  //  get Top 5 most popular products
  it('Get Top 5 most popular products', async () => {
    const result = await dashboardStore.mostPopularProducts();
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.length).toEqual(1);
  });

  // get 5 most recent purchases
  it('Get 5 most recent purchases ', async () => {
    const user_id = 1;
    const result = await dashboardStore.mostRecentOrders(user_id);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result.length).toEqual(1);
  });
});
//all deleted functions
describe('Delete functions', async () => {
  // delete user
  it('Delete user by id', async () => {
    const id = 2;
    const result = await userStore.delete(id);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result).toEqual(0);
  });
  //delete product
  it('Delete product by id', async () => {
    const id = 2;
    const result = await productStore.delete(id);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result).toEqual(0);
  });
  // delete order
  it('Delete order by id', async () => {
    const id = 2;
    const result = await orderStore.delete(id);
    expect(async () => {
      result;
    }).not.toThrow();
    expect(result).toEqual(0);
  });
});
