const url = "http://localhost:3030/jsonstore/messenger"

function attachEvents() {
    document.getElementById("submit").addEventListener("click", sendBtn)
    document.getElementById("refresh").addEventListener("click", refreshBtn)


}

attachEvents();


async function sendBtn(){
    const author = document.querySelector('input[name="author"]').value.trim()
    const content = document.querySelector('input[name="content"]').value.trim()


    const requestData = JSON.stringify({
        author,
        content
    })


    if(!author || !content) {
        alert("Author and Content fields are required")
        return
    }

    try {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: requestData
        })
        document.querySelector('input[name="author"]').value = ""
        document.querySelector('input[name="content"]').value = ""
    }catch (err){
        throw new Error("Error sending message",)
    }

}


async function refreshBtn(){
    const textArea = document.getElementById("messages")
    textArea.value = ``

    try{
        const response = await fetch(url)

        if(!response.ok){
            throw new Error("Error")

        }

        const data = await response.json()

        const messages = Object.values(data)
        textArea.value = messages.map(m => `${m.author}: ${m.content}`).join("\n")


    }catch (error){
        console.log('Fetching Error')
        }
}