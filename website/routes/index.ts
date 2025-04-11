import config from "@/config";
import AdminLayout from "@/layouts/AdminLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";
import Products from "@/pages/Products";
import Users from "@/pages/Users";

const routes = [
    {
        path: config.routes.home,
        component: Home,
    },
    // Auth
    {
        path: config.routes.login,
        component: Login,
    },
    // Products
    {
        path: config.routes.products,
        component: Products,
        layout: AdminLayout,
    },
    {
        path: config.routes.productDetail,
        component: ProductDetail,
        layout: null,
    },
    // Users
    {
        path: config.routes.users,
        component: Users,
        protected: true,
    },
    {
        path: config.routes.notFound,
        component: NotFound,
    },
];

export default routes;