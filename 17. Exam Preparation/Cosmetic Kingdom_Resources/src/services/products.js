import {productsURL, productURL} from "../constants/index.js";
import page from "./../../node_modules/page/page.mjs"
import {getAuthData} from "./auth.js";

export function getProducts(ctx, next){
    fetch(productsURL)
        .then((res) => res.json())
        .then((data) => {
            ctx.products = data
            next()
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

export function getBuyCount(ctx, next){
    fetch(`http://localhost:3030/data/bought?where=productId%3D%22${ctx.product._id}%22&distinct=_ownerId&count`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            ctx.boughtCount = data
            next()
        })
}

export function isBoughtByUser(ctx, next){
    fetch(`http://localhost:3030/data/bought?where=productId%3D%22${ctx.product._id}%22%20and%20_ownerId%3D%22${ctx.authData._id}%22&count`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            ctx.isBoughtByUser = data !== 0
            next()
        })
}


export function handleBuy(e, productId){
    e.preventDefault()

    const body = {
        productId
    }

    buyProduct(body, productId)
        .then((res) => {
            console.log(res)
            page.redirect("/products/" + productId)
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        })
}




export function handleEditProduct(e, id){
    e.preventDefault()

    const formData = new FormData(e.target)

    const name = formData.get("name")
    const imageUrl = formData.get("imageUrl")
    const category = formData.get("category")
    const description = formData.get("description")
    const price = formData.get("price")

    if (!name || !imageUrl || !category || !description || !price ){
        return alert("All fields are required")
    }


    const body = {
        name,
        imageUrl,
        category,
        description,
        price
    }

    editProduct(body,id)
        .then((res) => {
            console.log(res)
            page.redirect("/products")
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        })
}

export function handleCreateProduct(e){
    e.preventDefault()

    const formData = new FormData(e.target)

    const name = formData.get("name")
    const imageUrl = formData.get("imageUrl")
    const category = formData.get("category")
    const description = formData.get("description")
    const price = formData.get("price")

    if (!name || !imageUrl || !category || !description || !price ){
        return alert("All fields are required")
    }


    const body = {
        name,
        imageUrl,
        category,
        description,
        price
    }

    createProduct(body)
        .then((res) => {
            console.log(res)
            page.redirect("/products")
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        })
}

function buyProduct(body, id){
    return fetch("http://localhost:3030/data/bought", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `${getAuthData().accessToken}`,
        },
        body: JSON.stringify(body)
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

export function deleteProduct(id){
    return fetch(`${productURL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `${getAuthData().accessToken}`,
        }
    })
}



function createProduct(body){
    return fetch(productsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `${getAuthData().accessToken}`,
        },
        body: JSON.stringify(body)
    })
}

