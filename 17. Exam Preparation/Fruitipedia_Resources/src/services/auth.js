import {loginURL, logoutURL, registerURL} from "./../constants/index.js";
import page from "./../../node_modules/page/page.mjs"

export function getAuthData(){
    return JSON.parse(localStorage.getItem("auth"))
}

function setAuthData(authData) {
    localStorage.setItem("auth", JSON.stringify(authData))
}



function login(body){
    return fetch(loginURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then((res) => {
        if (res.status !== 200){
            throw new Error("Invalid credentials!")
        }
        return res.json()

    }).then((data) => {
        setAuthData(data)
    })
}

export function handleLogin(e){
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password){
        alert("All fields are required")
        return
    }

    const body = {
        email,
        password
    }

    login(body)
        .then(() => {
            page.redirect("/")
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        })
}


function register(body){
    return fetch(registerURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then((res) => {
        if (res.status !== 200){
            throw new Error("Invalid credentials!")
        }
        return res.json()

    }).then((data) => {
        setAuthData(data)
    })
}



export function handleRegister(e){
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get("email")
    const rePassword = formData.get("password")
    const password = formData.get("re-password")

    if (!email || !password || !rePassword){
        alert("All fields are required")
        return
    }

    if (password !== rePassword){
        alert("Both passwords are different")
        return
    }

    const body = {
        email,
        password
    }

    register(body)
        .then(() => {
            page.redirect("/")
        })
        .catch((err) => {
            alert(err.message)
            console.log(err)
        })
}

export function logout(){
    return fetch(logoutURL, {
        method: "GET",
        headers: {
            "X-Authorization": getAuthData().accessToken,
        }
    })
        .then(() => {
            localStorage.removeItem("auth")
        })
}
