function solve() {
    const stopInfoElement = document.querySelector('div#info span.info')

    const departBtn = document.getElementById("depart")
    const arriveBtn = document.getElementById("arrive")

    let nextStopId = "depot";
    let stopName = "";


    async function depart() {
        try{

            const response = await fetch(
                `http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`
            );

            if(!response.ok){
                const error = new Error();
                error.message = response.statusText
                error.status = response.status

                throw error
            }

            const data = await response.json();

            stopName = data.name
            nextStopId = data.next

            stopInfoElement.textContent = `Next stop ${stopName}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;

        }catch(error){
            stopInfoElement.textContent = `Error`
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        stopInfoElement.textContent = `Arriving at ${stopName}`
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();