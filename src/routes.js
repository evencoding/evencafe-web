const routes = {
  home: "/",
  login: "/login",
  signUp: "/sign-up",
  category: "/category",
  profile: "/profile/:username",
  searchCategory: ["/search/category", "/search/category/:name"],
  searchShop: ["/search/shop", "/search/shop/:keyword"],
  editShop: "/shop/:id",
  createCoffeeShop: "/add",
  shop: "/shop/:id",
};

export default routes;
