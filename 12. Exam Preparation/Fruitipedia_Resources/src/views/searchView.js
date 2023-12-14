import { render, html} from "./../../node_modules/lit-html/lit-html.js"
import {handleSearch} from "../services/products.js";
import * as productService from "./../services/products.js";
import { render, html } from "./../../node_modules/lit-html/lit-html.js";

const root = document.querySelector("main")

export function searchView() {
    render(searchTemplate(), root);
}



export function searchTemplate() {
    return html`
        <section id="search">
            <form @submit=${handleSearch}>
                <input type="text" name="search" placeholder="Search by name" />
                <button type="submit">Search</button>
            </form>
        </section>
    `;
}

export function searchProducts(query) {
    return fetch(`/data/fruits?where=name%20LIKE%20%22${query}%22`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            return response.json();
        });
}



export function handleSearch(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const query = formData.get("search");

    if (!query) {
        alert("Please enter a search query");
        return;
    }

    productService.searchProducts(query)
        .then(data => {
            render(productsTemplate(data), root);
        })
        .catch(err => {
            console.error(err);
            alert("An error occurred during the search. Please try again.");
        });
}



