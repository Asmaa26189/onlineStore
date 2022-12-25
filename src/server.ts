import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import dashboardRoutes from './handlers/dashboard';

const address = '0.0.0.0:3000';

// define express
const app = express();
// //define port
// const port = 3000;

app.use(bodyParser.json());

userRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.get('/', function (req: Request, res: Response) {
  res.send('start your online store');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
