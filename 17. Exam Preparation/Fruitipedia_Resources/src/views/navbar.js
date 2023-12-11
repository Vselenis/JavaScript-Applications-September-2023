import {render, html} from "./../../node_modules/lit-html/lit-html.js";


const header = document.querySelector("header");

const loggedInTemplate = () => {
    return html`
        <div class="user">
            <a href="/add">Add Fruit</a>
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
        <a id="logo" href="/"
        ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
            <div>
                <a href="/fruits">Fruits</a>
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

