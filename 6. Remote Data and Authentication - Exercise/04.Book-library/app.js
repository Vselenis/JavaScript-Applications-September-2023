const url = "http://localhost:3030/jsonstore/collections/books"


function library(){
    const editBtn = document.querySelectorAll("button:contains('Edit')")
    editBtn.forEach((btn) =>{
        btn.addEventListener("click", editElement)
    })

}

library()


function editElement(){
    console.log("asd")
}