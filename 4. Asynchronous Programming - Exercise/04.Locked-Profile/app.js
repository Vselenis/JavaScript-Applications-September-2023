async function lockedProfile() {
    let main = document.getElementById("main")
    const url = "http://localhost:3030/jsonstore/advanced/profiles"
    try{
        const response = await fetch(url)

        if (!response.ok){
            const error = new Error()
            error.message = response.statusText
            error.status = response.status


        }
        const data = await response.json()
        createProfile(data)

    }catch(error){
        throw new Error("Response failed")
    }


    function createProfile(d){
        let originalProfile = document.querySelector('.profile')

        main.innerHTML = ""

        let count = 1

        Object.entries(d).forEach(([k, v]) => {
            let profileDiv = originalProfile.cloneNode(true)

            profileDiv.querySelector('input[name="user1Username"]').value = v.username
            profileDiv.querySelector('input[name="user1Email"]').value = v.email
            profileDiv.querySelector('input[name="user1Age"]').value = v.age

            profileDiv.querySelector('input[name="user1Username"]').name = `user${count}Username`
            profileDiv.querySelector('input[name="user1Email"]').name = `user${count}Email`
            profileDiv.querySelector('input[name="user1Age"]').name = `user${count}Age`

            profileDiv.querySelector('.user1Username').style.display = 'none'
            main.appendChild(profileDiv)
            count += 1

        })
        Array.from(document.querySelectorAll(".profile button"))
            .forEach(btn => btn.addEventListener("click", onClick))
    }


    function onClick(e){
        const profile = e.target.parentElement
        const isActive = profile.querySelector("input[type = 'radio'][value = 'unlock']").checked

        if (isActive){
            const info = profile.querySelector(".user1Username")

            if (e.target.textContent === "Show more"){
                info.style.display = 'block'
                e.target.textContent = 'Hide it'
            }else {
                info.style.display = "none"
                e.target.textContent = "Show more"
            }
        }
    }
}

