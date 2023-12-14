import { render, html } from "./../../node_modules/lit-html/lit-html.js"
import {handleEditProduct} from "../services/products.js";

const root = document.querySelector("main")

function editProductTemplate(product) {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit Fruit</h2>
                <form class="edit-form" @submit=${(e) => handleEditProduct(e, product._id)}>
                    <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Fruit Name"
                            value=${product.name}
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="Fruit-image"
                            placeholder="Fruit Image URL"
                            value=${product.imageUrl}
                    />
                    <textarea
                            id="fruit-description"
                            name="description"
                            placeholder="Description"
                            rows="10"
                            cols="50"
                    >${product.description}</textarea>
                    <textarea
                            id="fruit-nutrition"
                            name="nutrition"
                            placeholder="Nutrition"
                            rows="10"
                            cols="50"
                    >${product.nutrition}</textarea>
                    <button type="submit">post</button>
                </form>
            </div>
        </section>
    }`
}

export function editProductView(ctx){
    render(editProductTemplate(ctx.product), root)
}