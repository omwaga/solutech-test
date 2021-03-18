import Home from './components/Home';
import NotFound from './components/NotFound';
import SupplierProducts from './components/SupplierProducts';
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
            name: 'suppliers'
        },

        {
            path: '/supplier-products',
            component: SupplierProducts,
            name: 'suppliers.products'
        },
    ]
};
