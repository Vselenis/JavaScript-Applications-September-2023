function library(){
    const buttons = document.querySelectorAll("td button")

    const editBtn = [...buttons].filter((button) => button.textContent === 'Edit')
    editBtn.forEach((btn) =>{
        btn.addEventListener("click", editElement)
    })

    const delBtn = [...buttons].filter((bt) => bt.textContent === "Delete")
    delBtn.forEach((b) => {
        b.addEventListener("click", deleteElement)
    })

    const submitBtn = [...buttons].filter((g) => g.textContent === "Submit")
    submitBtn.forEach((z) => {
        z.addEventListener("click", submitElement)
    })

    document.getElementById("loadBooks").addEventListener(
        "click", createElements
    )

}

library()

async function loadBookById(id){
    const book = await fetch("http://localhost:3030/jsonstore/collections/books/" + id)
    return book
}

async function editElement(event) {

    const id = event.target.parentElement.dataset.id
    const book = event.target.parentElement.dataset.book


    const result = await fetch("http://localhost:3030/jsonstore/collections/books/" + id,{
        method: "put",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
    event.target.parentElement.parentElement.edit();

}

async function deleteElement(event){
    console.log("asd")
    console.log(id)
    const id = event.target.parentElement.dataset.id

    await fetch("http://localhost:3030/jsonstore/collections/books/" + id,{
        method: "delete",
        headers:{
            "Content-Type": "application/json"
        }
    })
    event.target.parentElement.parentElement.remove();

}

async function submitElement(event){
    console.log("asd")
    event.preventDefault()

    const author = document.querySelector("input[name='title']").value.trim()
    const title = document.querySelector("input[name='author']").value.trim()


    if(!author.value || !title.value){
        alert("Fields can't be empty")
        return
    }

    const requestData = JSON.stringify({
        author,
        title
    });
    console.log(requestData)
    try{
        await fetch("http://localhost:3030/jsonstore/collections/books", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: requestData

        })

        document.querySelector("input[name='title']").value = ""
        document.querySelector("input[name='author']").value = ""

    }catch (er){
        console.error("Error", er)
    }
}


async function createElements() {
    console.log("asd")

    try{
        const response = await fetch("http://localhost:3030/jsonstore/collections/books")

        if(!response.ok){
            console.log("Fetching problem")
        }

        const data = await response.json()
        const tbody = document.querySelector("tbody")

        tbody.innerHTML = ""

        Object.entries(data).forEach(([k, v]) => {
            const trElement = document.createElement("tr")
            trElement.setAttribute("data-id", k)


            const bookCell = document.createElement("td")
            const authorCell = document.createElement("td")
            const actionCell = document.createElement("td")

            bookCell.textContent = v.title
            authorCell.textContent = v.author
            actionCell.innerHTML = `<button class="edit">Edit</button>
                                     <button class="delete">Delete</button>`

            trElement.appendChild(bookCell)
            trElement.appendChild(authorCell)
            trElement.appendChild(actionCell)

            tbody.appendChild(trElement)
        })

            }catch(err){
        console.error("Error", err)
    }
}


