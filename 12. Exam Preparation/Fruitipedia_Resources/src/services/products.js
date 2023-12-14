import {productsURL, productURL} from "../constants/index.js";
import page from "./../../node_modules/page/page.mjs"
import {getAuthData} from "./auth.js";


const root = document.querySelector("main")

export function getProducts(ctx, next){
    fetch(productsURL)
        .then((res) => res.json())
        .then((data) => {
            ctx.products = data
            next()
        })
}

export function handleCreateProduct(e){
    e.preventDefault()

    const formData = new FormData(e.target)

    const name = formData.get("name")
    const imageUrl = formData.get("imageUrl")
    const description = formData.get("description")
    const nutrition = formData.get("nutrition")

    if (!name || !imageUrl || !description || !nutrition){
        return alert("All fields are required")
    }


    const body = {
        name,
        imageUrl,
        description,
        nutrition,
    }

    createProduct(body)
        .then((res) => {
            console.log(res)
            page.redirect("/fruits")
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        })
}


export function getProduct(ctx, next){
    fetch(`${productURL}/${ctx.params.id}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            ctx.product = data
            next()
        })
}

export function handleEditProduct(e, id){
    e.preventDefault()

    const formData = new FormData(e.target)

    const name = formData.get("name")
    const imageUrl = formData.get("imageUrl")
    const description = formData.get("description")
    const nutrition = formData.get("nutrition")

    if (!name || !imageUrl || !description || !nutrition){
        return alert("All fields are required")
    }


    const body = {
        name,
        imageUrl,
        description,
        nutrition,
    }


    editProduct(body,id)
        .then((res) => {
            console.log(res)
            page.redirect("/fruits")
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        })
}

function editProduct(body, id){
    return fetch(`${productURL}/${id}`, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `${getAuthData().accessToken}`,
        },
        body: JSON.stringify(body)

    })
}

function createProduct(body){
    return fetch(productURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `${getAuthData().accessToken}`,
        },
        body: JSON.stringify(body)
    })
}




export function deleteProduct(id){
    return fetch(`${productURL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `${getAuthData().accessToken}`,
        }
    })
}


