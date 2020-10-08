let cityName = document.getElementById("search-box")
let weather = document.getElementById("weather")
let submitBT = document.getElementById("submitButton")
let findBT = document.getElementById("findCityBT")

submitBT.addEventListener('click', function() {

        let city = cityName.value
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a1c98590efc26b1df7a9c56cd3bd43d`
        
        fetch(url)
            .then(response => response.json())
            .then(data => displayWeather(data))
        cityName.value = ''
    
})

findBT.addEventListener("click",function(){
    let url = `https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91/98.201.162.191`

    fetch(url)
    .then(response => response.json())
    .then (data => cityName.value = data.city)

    
})

function displayWeather(object) {
    let cityName = object.name;
    let description = object.weather[0].description;
    let temp = Math.floor(object.main.temp - 273.15);
    let tempMin = Math.floor(object.main.temp_min - 273.15);
    let tempMax = Math.floor(object.main.temp_max - 273.15);
    
  
  

    let display = `
    <main id="main-container">
            <section class="location">
                <div class="city">${cityName}</div>
                <div class="date">${getDate()}</div>
            </section>
            <div class="current">
                <div class="temp">${temp}<span>°c</span></div>
                <div class="weather">${description}</div>
                <div class="hi-low">${tempMin}°c / ${tempMax}°c</div>
            </div>
        </main>
    `

    weather.innerHTML = display

}

function getDate() {
    let d = new Date()
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[d.getMonth()]
    let day = d.getDate()
    let year = d.getFullYear()
    let todaysDate = `${month} ${day}, ${year}`
    return todaysDate
}
