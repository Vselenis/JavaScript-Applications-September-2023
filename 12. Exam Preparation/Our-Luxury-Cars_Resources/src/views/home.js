import { render, html } from "./../../node_modules/lit-html/lit-html.js"

const root = document.querySelector("main")

function homeTemplate() {
    return html`
        <section id="hero">
            <h1>
                Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
            </h1>
        </section>
    `
}

export function homeView(){
    render(homeTemplate(), root)
}