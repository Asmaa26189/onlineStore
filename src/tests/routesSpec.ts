// test all end points
import app from '../server';
import supertest from 'supertest';

let token = 'Bearer ';

const request = supertest(app);

// server.ts
describe('Test main', () => {
  it('Start page', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
});

//users.ts
describe('Users', () => {
  it('authenticate', async () => {
    const response = await request
      .post('/users/user1')
      .send({ password: '234' });
    token += response.body;
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });

  it('get all', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });

  it('get user', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });

  it('create', async () => {
    const response = await request
      .post('/users')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({
        username: 'user2',
        firstname: 'First2',
        lastname: 'Last2',
        password: '12311'
      });

    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('update', async () => {
    const response = await request
      .put('/users/2')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({
        username: 'user2',
        firstname: 'First2',
        lastname: 'Last2',
        password: '12311'
      });

    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('delete', async () => {
    const response = await request
      .delete('/users/3')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
});
//products.ts
describe('Products', () => {
  it('get all', async () => {
    const response = await request
      .get('/products')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('get product', async () => {
    const response = await request
      .get('/products')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('create', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ name: 'item2', price: 200, category: 'inventory' });
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('get product by category', async () => {
    const response = await request
      .get('/productsCategory/inventory')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('update', async () => {
    const response = await request
      .put('/products/1')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ name: 'item1', price: 800, category: 'service' });
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('delete by id', async () => {
    const response = await request
      .delete('/products/9')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
});
//otders.td
describe('Orders', () => {
  it('get all', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('get order', async () => {
    const response = await request
      .get('/orders/1')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('create', async () => {
    const response = await request
      .post('/orders')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ user_id: 1, status: 'active' });
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('update', async () => {
    const response = await request
      .put('/orders/1')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ user_id: 1, status: 'complete' });
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('delete', async () => {
    const response = await request
      .get('/orders/5')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  it('add product', async () => {
    const response = await request
      .post('/orders/1/products')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ order_id: 2, product_id: 2, quantity: 4 });
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
});
//dashboard.ts
describe('Dashboard', () => {
  it('Get all products in orders', async () => {
    const response = await request
      .get('/dashboard')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });

  it('Get completed orders by user', async () => {
    const response = await request
      .get('/dashboard/1/complete')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });

  it('Get active order by user', async () => {
    const response = await request
      .get('/dashboard/1/active')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  //get 5 recent purchases by user id
  it('Get 5 most recent purchases', async () => {
    const response = await request
      .get('/dashboard/recentOrders/users/1')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  // get 5 popular products
  it('Get popular products', async () => {
    const response = await request
      .get('/dashboard/popularProducts')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
});
