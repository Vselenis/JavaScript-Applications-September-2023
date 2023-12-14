import { render, html, nothing } from "./../../node_modules/lit-html/lit-html.js"
import {getAuthData} from "../services/auth.js";
import page from "./../../node_modules/page/page.mjs"



const root = document.querySelector("main")

function vehicleDetailsTemplate(product) {
    const isAuthenticated = getAuthData();

    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${product.imageUrl} alt="example1" />
                <p id="details-title">${product.name}</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p class="price">Price: ${product.price}</p>
                        <p class="weight">Weight: ${product.weight}</p>
                        <p class="top-speed">Top Speed: ${product.speed}</p>
                        <p id="car-description">${product.about}</p>
                    </div>
                    <!--Edit and Delete are only for creator-->

                    ${isAuthenticated && product._ownerId === isAuthenticated._id ? html`
                    <div id="action-buttons">
                        <a href=${`/edit/${product._id}`} id="edit-btn">Edit</a>
                        <a href="" id="delete-btn" @click=${(e) => onDelete(e, product._id)}>Delete</a>
                        
                    </div>
                ` : nothing
                    }
                    
                </div>
            </div>
        </section>
    `
}

function onDelete(e, id){
    e.preventDefault()
    if (confirm("You are about to permanently delete this item. Are you sure about this?")){
        page.redirect("/delete/" + id)
    }
}

export function vehicleDetailsView(ctx){
    render(
        vehicleDetailsTemplate(
            ctx.product
        ),
        root
    )
}