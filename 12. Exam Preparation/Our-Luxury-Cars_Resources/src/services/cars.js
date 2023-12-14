import {carsURL, carURL} from "../constants/index.js";
import page from "./../../node_modules/page/page.mjs"
import {getAuthData} from "./auth.js";

export function getVehicles(ctx, next){
    fetch(carsURL)
        .then((res) => res.json())
        .then((data) => {
            ctx.products = data
            next()
        })
}

export function getVehicle(ctx, next){
    fetch(`${carURL}/${ctx.params.id}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            ctx.product = data
            next()
        })
}

export function deleteVehicle(id){
    return fetch(`${carURL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `${getAuthData().accessToken}`,
        }
    })
}

function createVehicle(body){
    return fetch(carURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `${getAuthData().accessToken}`,
        },
        body: JSON.stringify(body)
    })
}

function editVehicle(body, id){
    return fetch(`${carURL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": `${getAuthData().accessToken}`,
        },
        body: JSON.stringify(body)
    })
}

export function handleEditVehicle(e, id){
    e.preventDefault()

    const formData = new FormData(e.target)

    const model = formData.get("model")
    const imageUrl = formData.get("imageUrl")
    const price = formData.get("price")
    const weight = formData.get("weight")
    const speed = formData.get("speed")
    const about = formData.get("about")

    if (!model || !imageUrl || !price || !weight || !speed || !about){
        return alert("All fields are required")
    }


    const body = {
        model,
        imageUrl,
        price,
        weight,
        speed,
        about
    }


    editVehicle(body,id)
        .then((res) => {
            page.redirect("/cars")
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        })
}



export function handleCreateVehicle(e){
    e.preventDefault()

    const formData = new FormData(e.target)

    const model = formData.get("model")
    const imageUrl = formData.get("imageUrl")
    const price = formData.get("price")
    const weight = formData.get("weight")
    const speed = formData.get("speed")
    const about = formData.get("about")

    if (!model || !imageUrl || !price || !weight || !speed || !about){
        return alert("All fields are required")
    }


    const body = {
        model,
        imageUrl,
        price,
        weight,
        speed,
        about
    }

    createVehicle(body)
        .then((res) => {
            console.log(res)
            page.redirect("/cars")
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        })
}




