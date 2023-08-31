const apiKey = "052b37caae519c28d90953b5a30182ca";
const aprUrl = "https://api.openweathermap.org/data/2.5/forecast?&cnt=40&units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(aprUrl + city + `&cnt=7&appid=${apiKey}`)
    console.log(response);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json()
        console.log(data);

        if (data.list[0].weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        } else if (data.list[0].weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        } else if (data.list[0].weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if (data.list[0].weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        } else if (data.list[0].weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    document.querySelector(".weather-description").innerHTML = data.list[0].weather[0].description;
    document.querySelector(".city").innerHTML = data.city.name + ", " + data.city.country;
    document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.list[0].main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed + " km/h";

    function weatherForcast(n) {
        const temperatureData = data.list.slice(n, 8).map(item => ({
            max: item.main.temp_max,
            min: item.main.temp_min
        }));

        let maxTemperature = temperatureData[0].max;
        let minTemperature = temperatureData[0].min;

        for (let i = 1; i < temperatureData.length; i++) {
            if (temperatureData[i].max > maxTemperature) {
                maxTemperature = temperatureData[i].max;
            }

            if (temperatureData[i].min < minTemperature) {
                minTemperature = temperatureData[i].min;
            }
        }

        document.querySelector(".temp" + n).innerHTML = `for the next ${n} days: ${Math.round(minTemperature)} ~ ${Math.round(maxTemperature)} °C`;
    }
    weatherForcast(1);
    weatherForcast(2);
    weatherForcast(3);
    weatherForcast(4);
    weatherForcast(5);
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
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
        unitSwitch.innerHTML = 'Switch to °C';
    } else {
        const tempCelsius = (parseFloat(tempElement.textContent) - 32) * 5 / 9;
        tempElement.textContent = tempCelsius.toFixed(1) + "°C";
        unitSwitch.innerHTML = 'Switch to °F';
    }

    isCelsius = !isCelsius;
});