const apikey = "a02ba68948831814b003f50f4b9bdea0";

const climaDataEl = document.getElementById("clima-data")

const cidadeinputEl = document.getElementById("cidade-input")


const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cidadeValue = cidadeinputEl.value;
    PegarDataClima(cidadeValue);
})

async function PegarDataClima(cidadeValue) {
    try {
        const resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidadeValue}&appid=${apikey}&units=metric`
          );
        
        if(!resposta.ok){
            throw new Error("Resposta da conexão não funcionou...")
        }

        const data = await resposta.json();

        const temperatura = Math.round(data.main.temp)

        const descricao = data.weather[0].descricao

        const icone = data.weather[0].icon
        
        const detalhes = [
            `Sensação Térmica: ${Math.round(data.main.feels_like)}`,
            `Humidade: ${data.main.humidity}%`,
            `Velocidade do Vento: ${data.wind.speed} m/s`,
        ]

        climaDataEl.querySelector(".icone").innerHTML = `<img src="http://openweathermap.org/img/wn/${icone}.png" alt="Icone de clima">`;

        climaDataEl.querySelector(".temperatura").textContent = `${temperatura}°C`;

        climaDataEl.querySelector(".descricao").textContent = descricao;

        climaDataEl.querySelector(".detalhes").innerHTML = detalhes.map((detalhes)=>`<div>${detalhes}</div>`).join("");
    } catch (error) {
        climaDataEl.querySelector(".icone").innerHTML = "";

        climaDataEl.querySelector(".temperatura").textContent = "";

        climaDataEl.querySelector(".descricao").textContent = "Aconteceu um erro, por favor tente novamente mais tarde";

        climaDataEl.querySelector(".detalhes").innerHTML = "";
    }
}