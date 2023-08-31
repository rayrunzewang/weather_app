const apiKey = "052b37caae519c28d90953b5a30182ca";
const aprUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(aprUrl + city + `&appid=${apiKey}`)
    console.log(response);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json()
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    console.log(data);

    document.querySelector(".weather-description").innerHTML = data.weather[0].description;
    document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener('keydown', (event) => {
    if(event.key ==='Enter'){
        event.preventDefault();
        checkWeather(searchBox.value);
    }
})

const tempElement = document.querySelector(".temp");
const toggleUnitButton = document.getElementById("toggleUnit");
let isCelsius = true;

toggleUnitButton.addEventListener("click", () => {
    const unitSwitch = document.querySelector('#toggleUnit')
    if (isCelsius) {
        const tempFahrenheit = (parseFloat(tempElement.textContent) * 9 / 5) + 32;
        tempElement.textContent = tempFahrenheit.toFixed(1) + "°F";
        unitSwitch.innerHTML  = 'Switch to °C';
    } else {
        const tempCelsius = (parseFloat(tempElement.textContent) - 32) * 5 / 9;
        tempElement.textContent = tempCelsius.toFixed(1) + "°C";
        unitSwitch.innerHTML  = 'Switch to °F';
    }

    isCelsius = !isCelsius;
});