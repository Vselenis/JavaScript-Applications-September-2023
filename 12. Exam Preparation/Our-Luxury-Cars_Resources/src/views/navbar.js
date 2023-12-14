import {render, html} from "./../../node_modules/lit-html/lit-html.js";


const header = document.querySelector("header");

const loggedInTemplate = () => {
    return html`
        <div class="user">
            <a href="/create">Add Your Car</a>
            <a href="/logout">Logout</a>
        </div>
    `;
};

const guestTemplate = () => {
    return html`
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    `;
};

const navbarTemplate = (isAuthenticated) => {
    return html`
        <!-- Navigation -->
        <a id="logo" href="/"><img id="logo-car" src="./images/car-logo.png" alt="img"/></a>
        <nav>
            <div>
                <a href="/cars">Our Cars</a>
                <a href="/search">Search</a>
            </div>
            ${isAuthenticated ? loggedInTemplate() : guestTemplate()}
        </nav>
    `;
};

export function navbarView(ctx, next) {
    const isAuthenticated = ctx.authData;
    render(navbarTemplate(isAuthenticated), header);
    next();
}
