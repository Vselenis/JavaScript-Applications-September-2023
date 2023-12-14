import { render, html } from "./../../node_modules/lit-html/lit-html.js"

const root = document.querySelector("main")

function vehicleTemplate(product){
    return html`
        <div class="car">
            <img src=${product.imageUrl} alt="example1" />
            <h3 class="model">${product.model}</h3>
            <div class="specs">
                <p class="price">Price: ${product.price}</p>
                <p class="weight">Weight: ${product.weight}</p>
                <p class="top-speed">Top Speed: ${product.speed}></p>
            </div>
            <a class="details-btn" href=${`/cars/${product._id}`}>More Info</a>
    `
}


function vehiclesSection(products) {
    return html`
        <section id="dashboard">
            ${products.map((p) => vehicleTemplate(p))}
        </section>
    `
}

function vehiclesTemplate(products) {
    return html`
        <h3 class="heading">Our Cars</h3>
        ${products && products.length > 0
        ? vehiclesSection(products)
        : html`<h3 class="nothing">Nothing to see yet</h3>`
    }`
}

export function vehiclesView(ctx){
    render(vehiclesTemplate(ctx.products), root)
}