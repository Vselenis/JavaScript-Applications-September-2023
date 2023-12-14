import page from "./../node_modules/page/page.mjs"

import {authMiddleware} from "./middlewares/authMiddleware.js"
import {getVehicle, getVehicles} from "./services/cars.js";


import {navbarView} from "./views/navbar.js"
import {homeView} from "./views/home.js";
import {loginView} from "./views/login.js";
import {registerView} from "./views/register.js";
import {logoutView} from "./views/logout.js";
import {vehiclesView} from "./views/ourCars.js";
import {createVehicleView} from "./views/createCar.js";
import {vehicleDetailsView} from "./views/carDetails.js";
import {editVehicleView} from "./views/editCar.js";
import {deleteView} from "./views/deleteCar.js";
import {searchView} from "./views/searchCar.js";


page(authMiddleware)
page(navbarView)
page("/", homeView)
page("/login", loginView)
page("/register", registerView)
page("/logout", logoutView)
page("/cars", getVehicles, vehiclesView)
page("/create", getVehicles, createVehicleView)
page("/cars/:id", getVehicle, vehicleDetailsView)
page("/edit/:id", getVehicle, editVehicleView)
page("/delete/:id", deleteView)
page("/search", searchView);

page.start()