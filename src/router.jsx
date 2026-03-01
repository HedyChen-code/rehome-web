import { createHashRouter } from 'react-router-dom';
import FrontendLayout from './layout/FrontendLayout';
import Home from './views/front/Home';
import Products from './views/front/Products';
import ProductDetail from './views/front/ProductDetail';
import NotFound from './views/front/NotFound';
import Cart from './views/front/Cart';
import CheckoutDetail from './views/front/CheckoutDetail';
import CheckoutComplete from './views/front/CheckoutComplete';
import TradeGuide from './views/front/TradeGuide';
import AdminLayout from './layout/AdminLayout';
import AdminHome from './views/admin/AdminHome';
import AdminProducts from './views/admin/AdminProducts';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './views/admin/AdminLogin';
import AdminTradeList from './views/admin/AdminTradeList';

export const router = createHashRouter([
  // --- 前台 ---
  {
    path: '/',
    element: <FrontendLayout navbarVariant="home" />,
    children: [
      {
        index: true,
        element: <Home />, //首頁
      },
    ],
  },
  {
    element: <FrontendLayout navbarVariant="default" />,
    children: [
      {
        path: 'products',
        element: <Products />, //商品頁
      },
      {
        path: 'product/:id',
        element: <ProductDetail />, //商品詳細頁
      },
      {
        path: 'cart',
        element: <Cart />, //購物車頁
      },
      {
        path: 'TradeGuide',
        element: <TradeGuide />, //收購說明頁
      },
      {
        path: 'checkout', //購物流程
        children: [
          {
            path: 'detail',
            element: <CheckoutDetail />, //填寫資料
          },
          {
            path: 'complete',
            element: <CheckoutComplete />, //結帳完成
          },
        ],
      },
    ],
  },
  //後台
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: 'products',
        element: <AdminProducts />,
      },
      {
        path: 'TradeList',
        element: <AdminTradeList />,
      },
    ],
  },
  {
    path: '*', // 404 頁面
    element: <NotFound />,
  },
]);
