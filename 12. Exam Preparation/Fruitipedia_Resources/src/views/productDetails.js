import { render, html, nothing } from "./../../node_modules/lit-html/lit-html.js"
import {getAuthData} from "../services/auth.js";
import page from "./../../node_modules/page/page.mjs"



const root = document.querySelector("main")

function productDetailsTemplate(product) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${product.imageUrl} alt="example1" />
                <p id="details-title">${product.name}</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p>${product.description}</p>
                        <p id="nutrition">Nutrition</p>
                        <p id = "details-nutrition">${product.nutrition}</p>
                    </div>
                    

                <!--Edit and Delete are only for creator-->


                ${product._ownerId === getAuthData()._id ?
        html`
                        <div id="action-buttons">
                            <a href=${`/edit/${product._id}`} id="edit-btn">Edit</a>
                            <a href="" id="delete-btn" @click=${(e) => onDelete(e, product._id)}>Delete</a>
                            
                        </div>
                    ` : nothing
                    }

            </div>
        </section>
    `
}

function onDelete(e, id){
    e.preventDefault()
    if (confirm("Are you sure?")){
        page.redirect("/delete/" + id)
    }
}

export function productDetailsView(ctx){
    render(
        productDetailsTemplate(
            ctx.product,
            ctx.authData
        ),
        root
    )
}