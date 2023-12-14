import { render, html } from "./../../node_modules/lit-html/lit-html.js"
import {handleCreateProduct} from "../services/products.js";

const root = document.querySelector("main")

function createProductTemplate() {
    return html`
        <section id="create">
            <div class="form">
                <h2>Add Fruit</h2>
                <form class="create-form" @submit=${handleCreateProduct}>
                    <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Fruit Name"
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="Fruit-image"
                            placeholder="Fruit Image"
                    />
                    <textarea
                            id="fruit-description"
                            name="description"
                            placeholder="Description"
                            rows="10"
                            cols="50"
                    ></textarea>
                    <textarea
                            id="fruit-nutrition"
                            name="nutrition"
                            placeholder="Nutrition"
                            rows="10"
                            cols="50"
                    ></textarea>
                    <button type="submit">Add Fruit</button>
                </form>
            </div>
        </section>
    }`
}

export function createProductView(){
    render(createProductTemplate(), root)
}