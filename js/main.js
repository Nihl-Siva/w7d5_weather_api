const form = document.querySelector('#weatherDataForm')
console.log(form)

form.addEventListener('submit', async ( event ) => {
    event.preventDefault();
    let searchTerm = document.querySelector('#searchTerm').value

    if (searchTerm.trim() !== '') {
        console.log(searchTerm)
        const weatherData = await getData(searchTerm)
        console.log(weatherData)

        createList(weatherData.name, weatherData.main.temp_max, weatherData.main.temp_min, weatherData.weather[0].main, weatherData.main.humidity)
    }
});

const getData = async (searchTerm) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm},us&appid=73e9a40e582248cc886141fe9c1bc016&units=imperial`)
    return response.data
}

const DOM_Elements = {
    weather_list: '.list-group.weather-list'
}
    
const createList = (city, highTemp, lowTemp, forecast, humidity) => {
    console.log(city, highTemp, lowTemp, forecast, humidity)
    const html = `<div class="weather-card mt-3 mb-3" style="width: 18rem; border-radius: 5px; border: black solid 1px;">
    <h2 id="list-group-title" style="background-color: black; color: white; margin: 0; padding: 10px; border-top-right-radius: 5px; border-top-left-radius: 5px;">Weather for ${city}</h2>
        <ul class="list-group list-group-flush" style="border-bottom-right-radius: 5px; border-bottom-left-radius: 5px;">
            <li class="list-group-item" style="border: black solid 1px;">High: ${highTemp}&#176 F</li>
            <li class="list-group-item" style="border: black solid 1px;">Low: ${lowTemp}&#176 F</li>
            <li class="list-group-item" style="border: black solid 1px;">Forecast: ${forecast}</li>
            <li class="list-group-item" style="border: black solid 1px;">Humidity: ${humidity}%</li>
        </ul>
    </div>`;
    document.querySelector(DOM_Elements.weather_list).insertAdjacentHTML('beforeend', html);
    document.querySelector('#searchTerm').value = '';
}

const clearButton = document.querySelector('#clearButton');

clearButton.addEventListener('click', () => {
    document.querySelector(DOM_Elements.weather_list).innerHTML = '';
    document.querySelector('#searchTerm').value = '';
});

