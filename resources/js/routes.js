import Home from './components/Home';
import NotFound from './components/NotFound';
import SupplierProducts from './components/SupplierProducts';
import Suppliers from './components/Suppliers';
import Products from './components/Products';
import OrderDetails from './components/OrderDetails';
import Orders from './components/Orders';

export default {
    mode: 'history',

    routes: [

        {
            path: '*',
            component: NotFound
        },


        {
            path: '/',
            component: Home,
            name: 'home'
        },

        {
            path: '/suppliers',
            component: Suppliers,
            name: 'suppliers'
        },

        {
            path: '/supplier-products',
            component: SupplierProducts,
            name: 'suppliers.products'
        },

        {
            path: '/products',
            component: Products,
            name: 'products'
        },

        {
            path: '/orders',
            component: Orders,
            name: 'orders'
        },

        {
            path: '/order-details',
            component: OrderDetails,
            name: 'order.details'
        },
    ]
};
