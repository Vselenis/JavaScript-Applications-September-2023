const url = "http://localhost:3030/jsonstore/collections/students"

function StudentList(){
    document.getElementById("submit").addEventListener("click", addStudent)
    loadInfo()

}

StudentList()


async function addStudent(ev){
    ev.preventDefault(); // Prevent the form from submitting and page reloading


    const firstName = document.querySelector("input[name='firstName']").value.trim()
    const lastName = document.querySelector("input[name='lastName']").value.trim()
    const facultyNumber = document.querySelector("input[name='facultyNumber']").value.trim()
    const grade = document.querySelector("input[name='grade']").value.trim()

    const requestData = JSON.stringify({
            firstName,
            lastName,
            facultyNumber,
            grade
        })

    if(!firstName || !lastName || !facultyNumber || !grade){
        alert("All fields are required")
        return
    }

    try{
        await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: requestData
        })

        const tr = document.createElement("tr")

        const fName = tr.insertCell(0);
        fName.innerText = firstName;

        const lName = tr.insertCell(1);
        lName.innerText = lastName;

        const fNumber = tr.insertCell(2);
        fNumber.innerText = facultyNumber;

        const score = tr.insertCell(3);
        score.innerText = grade;


        document.querySelector("input[name='firstName']").value = ''
        document.querySelector("input[name='lastName']").value = ''
        document.querySelector("input[name='facultyNumber']").value = ''
        document.querySelector("input[name='grade']").value = ''



    }catch (err){
        console.error("An error occurred:", err)
    }

}

async function loadInfo(){
    const tableBody = document.querySelector("#results tbody")

    try {
        const response = await fetch(url)

        if(!response.ok){
            throw new Error("Error")
        }
        const data = await response.json()


        Object.values(data).forEach((v) =>{
            const tr = document.createElement("tr")

            const fName = tr.insertCell(0);
            fName.innerText = v.firstName;

            const lName = tr.insertCell(1);
            lName.innerText = v.lastName;

            const fNumber = tr.insertCell(2);
            fNumber.innerText = v.facultyNumber;

            const score = tr.insertCell(3);
            score.innerText = v.grade;

            tableBody.appendChild(tr)
        });


    }catch (err){
        console.error("Fetching problem")
    }

}
