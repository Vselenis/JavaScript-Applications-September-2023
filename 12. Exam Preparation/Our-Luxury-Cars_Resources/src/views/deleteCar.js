import {deleteVehicle} from "../services/cars.js";
import page from "./../../node_modules/page/page.mjs"

export function deleteView(ctx){
    deleteVehicle(ctx.params.id)
        .then(() => {
            page.redirect("/cars")
        })
        .catch((err) => {
            alert(err.message)
        })
}