

async function solution() {
    const titlesUrl = "http://localhost:3030/jsonstore/advanced/articles/list";

    try {
        const titlesResponse = await fetch(titlesUrl);

        if (!titlesResponse.ok) {
            throw new Error(titlesResponse.statusText);
        }

        const titlesData = await titlesResponse.json();

        const main = document.getElementById("main");

        for (const article of Object.values(titlesData)) {
            const accordionDiv = document.createElement("div");
            accordionDiv.classList.add("accordion");

            const headDiv = document.createElement("div");
            headDiv.classList.add("head");

            const spanElement = document.createElement("span");
            spanElement.textContent = article.title;

            const btnElement = document.createElement("button");
            btnElement.classList.add("button");
            const articleId = article._id
            btnElement.id = articleId
            btnElement.textContent = "More";

            headDiv.appendChild(spanElement);
            headDiv.appendChild(btnElement);
            accordionDiv.appendChild(headDiv);

            const extraDiv = document.createElement("div");
            extraDiv.classList.add("extra");
            accordionDiv.appendChild(extraDiv);

            main.appendChild(accordionDiv);

            btnElement.addEventListener("click", () => {
                toggleInfo(extraDiv, btnElement, articleId);
            });
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function toggleInfo(extraDiv, btnElement, articleId) {
    if (extraDiv.style.display === "none" || extraDiv.style.display === "") {
        const p = await details(articleId)
        extraDiv.appendChild(p)
        extraDiv.style.display = "block";
        btnElement.textContent = "Less";
    } else {
        extraDiv.style.display = "none";
        btnElement.textContent = "More";
    }
}

async function details(currentId){
    const contentUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${currentId}`
    try {
        const response = await fetch(contentUrl)

        if(!response.ok){
            throw new Error(response.statusText)
        }
        const data = await response.json()
        const pElement = document.createElement("p")
        pElement.textContent = data.content
        return pElement

    }catch(error){
        console.log("Error")
    }
}


solution();
