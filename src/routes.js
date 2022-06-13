const routes = {
  home: "/",
  login: "/login",
  signUp: "/sign-up",
  category: "/category",
  profile: "/profile/:username",
  editProfile: "/edit/profile/:username",
  searchShop: ["/search/shop", "/search/shop/:keyword"],
  editShop: "/shop/:id",
  createCoffeeShop: "/add",
  shop: "/shop/:id",
  categories: ["/categories", "/categories/:name"],
};

export default routes;
