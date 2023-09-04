async function getInfo() {
    const stopId = document.getElementById("stopId").value;
    const busesLi = document.getElementById(`buses`);

    busesLi.innerHTML = "";

    try{


    const response = await fetch(
        `http://localhost:3030/jsonstore/bus/businfo/${stopId}`
    );
    if (!response.ok){
        const error = new Error(response.statusText);

        throw error;
    }


    const data = await response.json();
    document.getElementById(`stopName`).textContent = data.name

    Object.entries(data.buses).forEach(([busId, time]) =>{
        const liElement = document.createElement('li');
        liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
        busesLi.appendChild(liElement);
    })
    } catch(error) {
        document.getElementById(`stopName`).textContent = `Error`
    }
}