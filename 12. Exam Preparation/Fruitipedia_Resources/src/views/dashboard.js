import { render, html } from "./../../node_modules/lit-html/lit-html.js"

const root = document.querySelector("main")

function productTemplate(product){
    return html`
        <div class="fruit">
            <img src=${product.imageUrl} alt="example1" />
            <h3 class="title">${product.name} </h3>
            <p class="description">${product.description}</p>
            <a class="details-btn" href=${`/fruits/${product._id}`}>More Info</a>
        </div>
    `
}


function productsSection(products) {
    return html`
        <section id="dashboard">
            ${products.map((p) => productTemplate(p))}
        </section>
    `
}

function productsTemplate(products) {
    return html`
        <h2>Fruits</h2>
        ${products && products.length > 0
        ? productsSection(products)
        : html`<h2>No fruit info yet.</h2>`
    }`
}

export function dashboardView(ctx){
    render(productsTemplate(ctx.products), root)
}