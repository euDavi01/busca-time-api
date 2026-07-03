let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let statusMessage = document.getElementById("statusMessage");
let teamCard = document.getElementById("teamCard");
let teamLogo = document.getElementById("teamLogo");
let teamName = document.getElementById("teamName");
let teamCountry = document.getElementById("teamCountry");
let teamFounded = document.getElementById("teamFounded");
let teamStadium = document.getElementById("teamStadium");
let teamCapacity = document.getElementById("teamCapacity");
let teamCity = document.getElementById("teamCity");

searchButton.addEventListener("click", buscarTime);
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarTime();
    }
});

async function buscarTime() {
    let nomeTime = searchInput.value.trim();

    if (nomeTime === "") {
        alert("digite o nome de um time");
        return;
    }
    statusMessage.classList.remove("hidden");
    statusMessage.textContent = "Buscando informações....";
    
    try {
        const url = "https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=" + nomeTime;
        const response = await fetch(url);
        const data = await response.json();
    
        if (data.teams === null || data.teams.length === 0) {
            alert("Time não encontrado. Tente outro nome");
            statusMessage.classList.add("hidden");
            return;
        }
        
        let time = data.teams[0];
        exibirTime(time);
        statusMessage.classList.add("hidden");
        
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert("Erro ao buscar dados. Tente de novo");
        statusMessage.classList.add("hidden");
    }
}

function exibirTime(time) {
    teamLogo.src = time.strTeamBadge || "https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_braz_logo.svg";
    teamName.textContent = time.strTeam || "Nome não disponível";
    teamCountry.textContent = time.strCountry || "País não disponível";
    teamFounded.textContent = time.intFormedYear || "Não disponível";
    teamStadium.textContent = time.strStadium || "Não disponível";
    teamCapacity.textContent = (time.intStadiumCapacity || "Não disponível");
    teamCity.textContent = time.strLocation || "Não disponível";
}