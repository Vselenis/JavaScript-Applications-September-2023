import { html, render } from "./../../node_modules/lit-html/lit-html.js";

const root = document.querySelector("main");

function searchTemplate() {
    return html`
        <section id="search">
            <div class="form">
                <h4>Search</h4>
                <form class="search-form" @submit=${handleSearch}>
                    <input type="text" name="search" id="search-input" />
                    <button class="button-list">Search</button>
                </form>
            </div>
            <div class="search-result">
                <h2 class="no-avaliable">No result.</h2>

                <div id="search-results"></div>
            </div>
        </section>
    `;
}

export function searchView(ctx, next) {
    render(searchTemplate(), root);
    next();
}

function handleSearch(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const query = formData.get("search");

    if (!query) {
        alert("Please enter a search query");
        return;
    }

    searchVehicle(query)
        .then((data) => {
            render(searchResultsTemplate(data), document.getElementById("search-results"));
        })
        .catch((err) => {
            console.log(err);
        });
}

function searchVehicle(query) {
    return fetch(`http://localhost:3030/data/cars?where=model%20LIKE%20%22${query}%22`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to fetch cars: ${res.status}`);
            }
            return res.json();
        });
}

function searchResultsTemplate(products) {
    return html`
        ${products && products.length > 0
        ? html`${products.map((p) => vehicleTemplate(p))}`
        : html`<h2 class="no-avaliable">No result.</h2>`}
    `;
}

function vehicleTemplate(product) {
    return html`
        <div class="car">
            <img src=${product.imageUrl} alt="example1"/>
            <h3 class="model">${product.model}</h3>
            <a class="details-btn" href=${`/cars/${product._id}`}>More Info</a>
        </div>
    `;
}
