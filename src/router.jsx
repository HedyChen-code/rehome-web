import { createHashRouter } from 'react-router-dom';
import FrontendLayout from './layout/FrontendLayout';
import Home from './views/front/Home';
import Products from './views/front/Products';
import ProductDetail from './views/front/ProductDetail';
import NotFound from './views/front/NotFound';
import Cart from './views/front/Cart';
import CheckoutDetail from './views/front/CheckoutDetail';
import CheckoutComplete from './views/front/CheckoutComplete';

export const router = createHashRouter([
  // --- 前台 ---
  {
    path: '/',
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />, //首頁
      },
      {
        path: 'product',
        element: <Products />,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        children: [
          {
            path: 'detail',
            element: <CheckoutDetail />
          },
          {
            path: 'complete',
            element: <CheckoutComplete />
          }
        ]
      }
    ],
  },
  {
    path: '*', // 404 頁面
    element: <NotFound />,
  },
]);
