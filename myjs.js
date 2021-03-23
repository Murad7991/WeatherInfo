window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureTimezone = document.querySelector('.location-timezone');
    let temperature = document.querySelector('.temperature')
    let temperatureSpan = document.querySelector('.temperature span')
    let button = document.querySelector('.button')
    let inp = document.querySelector('.inp input')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        })
        button.addEventListener('click', () => {
            let city2 = inp.value
            const api = `http://api.openweathermap.org/data/2.5/weather?q=${city2}&units=metric&appid=7e50eb060780df75021e1e6f13ded486`;

            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(response => {
                    console.log(response)
                    const temp = Math.floor(response.main.temp);
                    console.log(temp)
                    const {description, icon} = response.weather[0]
                    const fahrenheit = (9 / 5) * (temp + 32)
                    temperatureDegree.textContent = temp
                    temperatureDescription.textContent = description
                    temperatureTimezone.textContent = response.name
                    document.querySelector('.icon').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
                    temperature.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "°C") {
                            temperatureSpan.textContent = "F"
                            temperatureDegree.textContent = Math.floor(fahrenheit)
                        } else {
                            temperatureSpan.textContent = "°C"
                            temperatureDegree.textContent = temp
                        }
                    })
                })

        })
    }

})
