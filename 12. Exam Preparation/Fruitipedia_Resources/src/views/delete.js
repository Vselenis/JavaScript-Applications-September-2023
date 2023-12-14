import {deleteProduct} from "../services/products.js";
import page from "./../../node_modules/page/page.mjs"

export function deleteView(ctx){
    deleteProduct(ctx.params.id)
        .then((res) => {
            page.redirect("/fruits")
        })
        .catch((err) => {
            alert(err.message)
        })
}