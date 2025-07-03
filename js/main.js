// API Key     872302ff72b940a6b76130827240511

// const rowWeather = document.querySelector("#weather");

let weatherDateCurrent = "";
async function currentWeather() {
    // Request & Response
    const weather = await fetch("http://api.weatherapi.com/v1/forecast.json?key=872302ff72b940a6b76130827240511&q=Cairo&days=3&aqi=no&alerts=no");
    const log = await weather.json();
    console.log(log);

    // Current Day
    weatherDateCurrent = log.current.last_updated;
    const weatherLocation = log.location.name;
    const weatherTemp = log.current.temp_c;
    const weatherIcon = `https:${log.current.condition.icon}`;
    const weatherCondition = log.current.condition.text;

    // Tomorrow
    const D1 = log.forecast.forecastday[1].date;
    const T1 = log.forecast.forecastday[1].day.maxtemp_c;
    const I1 = `https:${log.forecast.forecastday[1].day.condition.icon}`;
    const C1 = log.forecast.forecastday[1].day.condition.text;

    // Day After Tomorrow
    const D2 = log.forecast.forecastday[2].date;
    const T2 = log.forecast.forecastday[2].day.maxtemp_c;
    const I2 = `https:${log.forecast.forecastday[2].day.condition.icon}`;
    const C2 = log.forecast.forecastday[2].day.condition.text;

    display(weatherDateCurrent, weatherLocation, weatherTemp, weatherIcon, weatherCondition);
    display(D1, weatherLocation, T1, I1, C1);
    display(D2, weatherLocation, T2, I2, C2);
}
currentWeather()

function display(date, location, temp, icon, condition) {
    let container = `
        <div class="col-12 col-lg-4">
            <div class="card rounded-4 border-0">
                <div class="card-header d-flex flex-row justify-content-between">
                    ${returnWeekDay(date)}
                    <div>${returnDayDate(date)}</div>
                </div>
                <div class="card-body">
                    <p>${location}</p>
                    <h2 class="fw-bold text-white d-inline">${temp}<span>o</span>C</h2>
                    <img src="${icon}" alt="weather icon">
                    <p>${condition}</p>
                    <ul class="list-unstyled">
                        <li class="pe-3">
                            <i class="fa-solid fa-umbrella fs-5"></i>
                            20%
                        </li>
                        <li class="pe-3">
                            <i class="fa-solid fa-wind fs-5"></i>
                            18km/h
                        </li>
                        <li class="pe-3">
                            <i class="fa-regular fa-compass fs-5"></i>
                            East
                        </li>
                    </ul>
                </div>
            </div>
        </div>`
    document.querySelector("#weather").innerHTML += container;
}

function returnWeekDay(weatherDateCurrent) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(weatherDateCurrent);
    const weekdayName = weekdays[date.getUTCDay()];
    // console.log(weekdayName);
    return weekdayName;


    // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // const d = new Date(log.current.last_updated);
    // console.log(weekday[d.getDay()]);
}

function returnDayDate(weatherDateCurrent) {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const isoString = weatherDateCurrent.replace(' ', 'T');
    const date = new Date(isoString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    const formattedDate = `${day}${monthName}`;
    // console.log(formattedDate);
    return formattedDate;
}