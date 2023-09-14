const baseUrl = "http://localhost:3030/jsonstore/phonebook"

function attachEvents() {
    document.getElementById("btnLoad").addEventListener('click', loadPhoneBook)
    document.getElementById("phonebook").addEventListener("click", deletePhone)
    document.getElementById("btnCreate").addEventListener("click", createPhone)
}

attachEvents();


async function loadPhoneBook(){

    const response = await fetch(baseUrl)

    const data = await response.json()
    const phonebookElement = document.getElementById("phonebook")
    phonebookElement.innerHTML = ""

    Object.values(data).forEach((x) => {
        const liElement = document.createElement("li")
        liElement.textContent = `${x.person}: ${x.phone}`

        const deleteBtnElement = document.createElement("button")
        deleteBtnElement.setAttribute('id', x._id)
        deleteBtnElement.textContent = "Delete"

        liElement.appendChild(deleteBtnElement)

        phonebookElement.appendChild(liElement)
    })
}

async function deletePhone(e){
    if (e.target.textContent !== "Delete"){
        return
    }
    const currentPhoneId = e.target.id

    await fetch(`${baseUrl}/${currentPhoneId}`,{
        method: "DELETE",
    })

    loadPhoneBook()
}

async function createPhone(){
    const person = document.getElementById("person").value.trim()
    const phone = document.getElementById("phone").value.trim()

    const requestData = JSON.stringify({
        person,
        phone
    })


    if(!person.value || !phone.value){
        alert("Person and Phone fields are required")
    }

    await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: requestData
    })
    document.getElementById("person").value = ""
    document.getElementById("phone").value = ""

}