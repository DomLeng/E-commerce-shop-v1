import React, { Suspense }from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { HelmetProvider} from 'react-helmet-async'
import { Provider} from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import store from './store.js'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
// import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';
// import HomeScreen from './screens/HomeScreen';
// import ProductScreen from './screens/ProductScreen';
// import CartScreen from './screens/CartScreen';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import ShippingScreen from './screens/ShippingScreen';
// import PaymentScreen from './screens/PaymentScreen';
// import ProfileScreen from './screens/ProfileSceen.jsx';
// import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx'
// import OrderScreen from './screens/OrderScreen.jsx'
// import OrderListScreen from './screens/admin/OrderListScreen';
// import ProductListScreen from './screens/admin/ProductListScreen';
// import ProductEditScreen from './screens/admin/ProductEditScreen';
// import UserListScreen from './screens/admin/UserListScreen';
// import UserEditScreen from './screens/admin/UserEditScreen';

// lazy load

const HomeScreen = React.lazy(()=> import ('./screens/HomeScreen.jsx'))
const ProductScreen = React.lazy(()=> import ('./screens/ProductScreen.jsx'))
const CartScreen = React.lazy(()=> import ('./screens/CartScreen.jsx'))
const LoginScreen = React.lazy(()=> import ('./screens/LoginScreen.jsx'))
const RegisterScreen = React.lazy(()=> import ('./screens/RegisterScreen.jsx'))
const ShippingScreen = React.lazy(()=> import ('./screens/ShippingScreen.jsx'))
const PaymentScreen = React.lazy(()=> import ('./screens/PaymentScreen.jsx'))
const ProfileScreen = React.lazy(()=> import ('./screens/ProfileSceen.jsx'))
const PlaceOrderScreen = React.lazy(()=> import ('./screens/PlaceOrderScreen.jsx'))
const OrderScreen = React.lazy(()=> import ('./screens/OrderScreen.jsx'))
const NotFoundScreen = React.lazy(()=> import ('./screens/NotFoundScreen.jsx'))

const PrivateRoute = React.lazy(()=> import ('./components/PrivateRoute.jsx'))
const AdminRoute = React.lazy(()=> import ('./components/AdminRoute.jsx'))
const OrderListScreen = React.lazy(()=> import ('./screens/admin/OrderListScreen.jsx'))
const ProductListScreen = React.lazy(()=> import ('./screens/admin/ProductListScreen.jsx'))
const ProductEditScreen = React.lazy(()=> import ('./screens/admin/ProductEditScreen.jsx'))
const UserListScreen = React.lazy(()=> import ('./screens/admin/UserListScreen.jsx'))
const UserEditScreen = React.lazy(()=> import ('./screens/admin/UserEditScreen.jsx'))




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumer' element={<HomeScreen />} />
      <Route 
        path='/search/:keyword/page/:pageNumber'
        element={<HomeScreen />}
      />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />}/>
      <Route path='/register' element={<RegisterScreen />} />

      {/* register users routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      {/* admin routes */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />}/>
        <Route path='/admin/productlist' element={<ProductListScreen />}/>
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />}/>
        <Route path='/admin/userlist' element={<UserListScreen />}/>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />}/>
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />}/>
      </Route>

      <Route path='*' element={<NotFoundScreen />} />
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <Provider store={store} >
          <PayPalScriptProvider deferLoading={true} >
            <Suspense fallback={<LoadingSpinner message='Loading page...' />}>
              <RouterProvider router={router} />
            </Suspense>
          </PayPalScriptProvider>
        </Provider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
