const config = {
    routes: {
        home: "/",

        // Auth
        login: "/login",

        // Products
        products: "/products",
        productDetail: "/products/:slug",

        // Users
        users: "/users",

        notFound: "*",
    },
};

export default config;