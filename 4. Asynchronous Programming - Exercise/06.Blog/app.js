function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener("click", loadPosts);
    document.getElementById("btnViewPost").addEventListener("click", viewPost);

}



async function loadPosts(e){

    try{
        const url = "http://localhost:3030/jsonstore/blog/posts";
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error (response.statusText)
        }


        document.getElementById("post").innerHTML = ""

        Object.entries(data).forEach(([key, value]) => {
            const optionElement = document.createElement("option");
            optionElement.value = key
            optionElement.textContent = value.title
            document.getElementById("posts").appendChild(optionElement)
        })
    } catch (error){
        console.log(error)
    }
}


async function viewPost(e) {
        try {

        let postId = ""
        document.querySelectorAll("option").forEach((o) => {
            if (o.selected){
                postId = o.value
            }
        })
        const postUrl = `http://localhost:3030/jsonstore/blog/posts/${postId}`;
        const postResponse = await fetch(postUrl)
        const postData = await postResponse.json()

        if (!postResponse.ok) {
            throw new Error("Failed to fetch post data");
        }


        document.getElementById("post-title").textContent = postData.title
        document.getElementById("post-body").textContent = postData.body

        const commentsUrl = "http://localhost:3030/jsonstore/blog/comments"
        const commentsResponse = await fetch(commentsUrl);
        const commentsData = await commentsResponse.json()

        if (!commentsResponse.ok) {
            throw new Error("Failed to fetch comments");
        }

        const filteredComments = Object.values(commentsData).filter(
            (x) => x.postId === postId
        )

        document.getElementById("post-comments").textContent = ""

        filteredComments.forEach(c => {
            const liElem = document.createElement('li')
            liElem.textContent = c.text
            liElem.id = c.id
            document.getElementById("post-comments").appendChild(liElem)
        })} catch (error) {
        console.error(error);

}

}



attachEvents();