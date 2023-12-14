import {deleteProduct} from "../services/products.js";
import page from "./../../node_modules/page/page.mjs"

export function deleteView(ctx){
    deleteProduct(ctx.params.id)
        .then((res) => {
            page.redirect("/products")
        })
        .catch((err) => {
            alert(err.message)
        })
}