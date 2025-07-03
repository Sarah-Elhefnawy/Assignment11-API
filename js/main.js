// API Key     872302ff72b940a6b76130827240511

const rowWeather = document.querySelector("#weather");

let weatherDate = "";
let weatherLocation = "";
let weatherTemp = "";
let weatherIcon = "";
let weatherCondition = "";
async function currentWeather() {
    const weather = await fetch("http://api.weatherapi.com/v1/forecast.json?key=872302ff72b940a6b76130827240511&q=Cairo&days=2&aqi=no&alerts=no");
    const log = await weather.json();


    weatherDate = log.current.last_updated;
    weatherLocation = log.location.name;
    weatherTemp = log.current.temp_c;
    weatherIcon = `https:${log.current.condition.icon}`;
    weatherCondition = log.current.condition.text;
    console.log(log);

    // returnWeekDay(weatherDate);
    // returnDayDate(weatherDate);

    display();
}
currentWeather()

function display() {
    let container = "";
    for (let i = 0; i < 3; i++) {
        container += `
            <div class="col-12 col-lg-4">
                <div class="card rounded-4 border-0">
                    <div class="card-header d-flex flex-row justify-content-between">
                                    ${returnWeekDay(weatherDate)}
                                    <div>${returnDayDate(weatherDate)}</div>
                                </div>
                                <div class="card-body">
                                    <p>${weatherLocation}</p>
                                    <h2 class="fw-bold text-white d-inline">${weatherTemp}<span>o</span>C</h2>
                                    <img src="${weatherIcon}" alt="weather icon">
                                    <p>${weatherCondition}</p>
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
                        </div>
        `
    }
    rowWeather.innerHTML = container;
}

function returnWeekDay(weatherDate) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(weatherDate);
    const weekdayName = weekdays[date.getUTCDay()];
    // console.log(weekdayName);
    return weekdayName;


    // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // const d = new Date(log.current.last_updated);
    // console.log(weekday[d.getDay()]);
}

function returnDayDate(weatherDate) {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const isoString = weatherDate.replace(' ', 'T');
    const date = new Date(isoString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    const formattedDate = `${day}${monthName}`;
    // console.log(formattedDate);
    return formattedDate;
}