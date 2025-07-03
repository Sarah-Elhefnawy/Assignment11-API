// API Key     872302ff72b940a6b76130827240511

let weatherDateCurrent = "";
async function getWeather(country) {
    // Request & Response
    const weather = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=872302ff72b940a6b76130827240511&q=${country}&days=3&aqi=no&alerts=no`);
    const log = await weather.json();
    // console.log(log);

    // Current Day
    weatherDateCurrent = log.current.last_updated;
    const weatherLocation = log.location.name;
    const weatherTemp = log.current.temp_c;
    const weatherIcon = `https:${log.current.condition.icon}`;
    const weatherCondition = log.current.condition.text;

    // Tomorrow
    const D1 = log.forecast.forecastday[1].date;
    const T1Max = log.forecast.forecastday[1].day.maxtemp_c;
    const T1Min = log.forecast.forecastday[1].day.mintemp_c;
    const I1 = `https:${log.forecast.forecastday[1].day.condition.icon}`;
    const C1 = log.forecast.forecastday[1].day.condition.text;

    // Day After Tomorrow
    const D2 = log.forecast.forecastday[2].date;
    const T2Max = log.forecast.forecastday[2].day.maxtemp_c;
    const T2Min = log.forecast.forecastday[2].day.mintemp_c;
    const I2 = `https:${log.forecast.forecastday[2].day.condition.icon}`;
    const C2 = log.forecast.forecastday[2].day.condition.text;

    display(weatherDateCurrent, weatherLocation, weatherTemp, T1Max, weatherIcon, weatherCondition, 1);
    display(D1, weatherLocation, T1Max, T1Min, I1, C1, 2);
    display(D2, weatherLocation, T2Max, T2Min, I2, C2, 3);
}
getWeather("alex");

// Display Cards
function display(date, location, temp, temp2, icon, condition, index) {
    let container = `
            <div class="card rounded-4 border-0">
                <div class="card-header card-date">
                    ${returnWeekDay(date)}
                    <div class="date">${returnDayDate(date)}</div>
                </div>
                <div class="card-body">
                    <p>${location}</p>
                    <img src="${icon}" class="unhide-img" alt="weather icon">
                    <div class="d-flex flex-row align-items-center">
                        <h2 class="card-img fw-bold text-white mb-0">${temp}<span>o</span>C</h2>
                        <img src="${icon}" class="hide-img" alt="weather icon">
                    </div>
                    <h3 class="card-h2 fs-4 lh-lg fw-bold mb-0">${temp2}<span>o</span>C</h3>
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
            </div>`
    document.querySelector(`#col${index}`).innerHTML = container;
}

// Convert from Date to Week Day
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

// From DD-MM-YY to DD-MM
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

// Search Input Event
function searchCountry() {
    const country = this.value.trim();
    if (country === "") {
        getWeather("Alex");
    } else {
        getWeather(country);
    }
}
document.querySelector("#search").addEventListener('input', searchCountry);
document.querySelector("#searchBtn").addEventListener('click', searchCountry);