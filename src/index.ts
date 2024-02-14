import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
import PRODUCTS from '../products.json';

const app = express();

app.use(cors());
app.use(morgan('tiny'));

interface CartItem {
  name: string;
  netPrice: number;
  weight: number;
  discount: number;
  quantity: number;
}

const cart: CartItem[] = [
	{
		name: 'ssd',
		netPrice: 95,
		weight: 100,
		discount: 5,
		quantity: 10
	},
	{
    name: 'motherboard',
    netPrice: 270,
    weight: 900,
    discount: 0,
    quantity: 1
	},
	{
    name: 'ram',
    netPrice: 120,
    weight: 60,
    discount: 10,
  	quantity: 2
	},
	{
    name: 'processor',
    netPrice: 400,
    weight: 130,
    discount: 10,
    quantity: 1
	},
	{
    name: 'power supply',
    netPrice: 130,
    weight: 1400,
    discount: 15,
    quantity: 1
	},
	{
    name: 'cpu cooler',
    netPrice: 170,
    weight: 1000,
    discount: 23,
    quantity:1
	},
	{
    name: 'gpu',
    netPrice: 1600,
    weight: 2500,
    discount: 0,
    quantity: 1
	},
	{
    name: 'case',
    netPrice: 130,
    weight: 3500,
    discount: 30,
    quantity: 1
	}
];

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('my middleware');

  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('my second middleware');

  next();
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200);
  res.send('hello world');
});

app.get('/cart-items', (req: Request, res: Response) => {
  console.log('handler');

  res.json(cart);
});

app.get('/products', (req: Request, res: Response) => {
  res.json(PRODUCTS);
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
