import { render, html, nothing } from "./../../node_modules/lit-html/lit-html.js"
import {getAuthData} from "../services/auth.js";
import {handleBuy} from "../services/products.js";
import page from "./../../node_modules/page/page.mjs"



const root = document.querySelector("main")

function productDetailsTemplate(product, authData, boughtCount, isAlreadyBought) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${product.imageUrl} alt="example1" />
                <p id="details-title">${product.name}</p>
                <p id="details-category">
                    Category: <span id="categories">${product.category}</span>
                </p>
                <p id="details-price">
                    Price: <span id="price-number">${product.price}</span>$</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Bought: <span id="buys">${boughtCount}</span> times.</h4>
                        <span
                        >${product.description}</span
                        >
                    </div>
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
                
                
                ${authData && authData._id !== product._ownerId && isAlreadyBought ? 
                        html`<div id="action-buttons">
                            <a href="" id="buy-btn" @click=${(e) => handleBuy(e, product._id)}>Buy</a>
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
            ctx.authData,
            ctx.boughtCount,
            ctx.isBoughtByUser
        ),
        root
    )
}