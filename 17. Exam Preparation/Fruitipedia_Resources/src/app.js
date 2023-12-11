import page from "./../node_modules/page/page.mjs"


import {authMiddleware} from "./middlewares/authMiddleware.js";
import {getProduct, getProducts} from "./services/products.js";


import {navbarView} from "./views/navbar.js";
import {homeView} from "./views/home.js";
import {loginView} from "./views/login.js";
import {registerView} from "./views/register.js";
import {logoutView} from "./views/logout.js";
import {dashboardView} from "./views/dashboard.js";
import {createProductView} from "./views/createProduct.js";
import {productDetailsView} from "./views/productDetails.js";
import {editProductView} from "./views/edit.js";
import {deleteView} from "./views/delete.js";
import {searchView} from "./views/searchView";


page(authMiddleware)
page(navbarView)


page("/", homeView)
page("/login", loginView)
page("/register", registerView)
page("/logout", logoutView)
page("/fruits", getProducts, dashboardView)
page("/add", getProducts, createProductView)
page("/fruits/:id", getProduct, productDetailsView)
page("/edit/:id", getProduct, editProductView)
page("/delete/:id", deleteView)
page("/search/:id", searchView)

page.start()