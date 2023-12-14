import { render, html } from "./../../node_modules/lit-html/lit-html.js"
import {handleEditVehicle} from "../services/cars.js";

const root = document.querySelector("main")

function editVehicleTemplate(product) {
    return html`
        <section id="edit">
            <div class="form form-auto">
                <h2>Edit Your Car</h2>
                <form class="edit-form"  @submit=${(e) => handleEditVehicle(e, product._id)}>
                    <input 
                            type="text" 
                            name="model" 
                            id="model" 
                            placeholder="Model"
                            value=${product.model}
                    />
                    <input
                            type="text"
                            name="imageUrl"
                            id="car-image"
                            placeholder="Your Car Image URL"
                            value=${product.imageUrl}
                    />
                    <input
                            type="text"
                            name="price"
                            id="price"
                            placeholder="Price in Euro"
                            value=${product.price}
                    />
                    <input
                            type="number"
                            name="weight"
                            id="weight"
                            placeholder="Weight in Kg"
                            value=${product.weight}
                    />
                    <input
                            type="text"
                            name="speed"
                            id="speed"
                            placeholder="Top Speed in Kmh"
                            value=${product.speed}
                    />
                    <textarea
                            id="about"
                            name="about"
                            placeholder="More About The Car"
                            rows="10"
                            cols="50"
                    >${product.about}</textarea>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    }`
}

export function editVehicleView(ctx){
    render(editVehicleTemplate(ctx.product), root)
}