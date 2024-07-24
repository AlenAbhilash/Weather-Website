let timeElement = document.getElementById('time');
let weatherdataButton = document.getElementById('searchdata');
let cityInput = document.getElementById('cityInput');
let weatherdataElement = document.getElementById('weatherdataElement');
let diapalycity = document.getElementById('diapalycity');
let cloudstatus = document.getElementById('cloudstatus');
let Todaydate = document.getElementById('Todaydate');
let deg = document.getElementById('deg');
let Humidity = document.getElementById('Humidity');
let Sunrise = document.getElementById('Sunrise');
let Sunset = document.getElementById('Sunset');
let Visibility = document.getElementById('Visibility');
let WindSpeed = document.getElementById('WindSpeed');
let day1deg = document.getElementById('day1');
let day2deg = document.getElementById('day2');
let day3deg = document.getElementById('day3');
let cloudstatus1 = document.getElementById('cloudstatus1');
let cloudstatus2 = document.getElementById('cloudstatus2');
let cloudstatus3 = document.getElementById('cloudstatus3');


// Date formatting function
function formatDate(date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let dayOfWeek = daysOfWeek[date.getDay()];
    let dayOfMonth = date.getDate();
    let month = monthsOfYear[date.getMonth()];
    let year = date.getFullYear().toString().slice(-2);
    return `${dayOfWeek} ${dayOfMonth}, ${month} '${year}`;
}
Todaydate.innerHTML = formatDate(new Date());
let date1 = new Date();
let date2 = new Date();
let date3 = new Date();

date1.setDate(new Date().getDate() + 1);
date2.setDate(new Date().getDate() + 2);
date3.setDate(new Date().getDate() + 3);

document.getElementById('date1').innerHTML = formatDate(date1);
document.getElementById('date2').innerHTML = formatDate(date2);
document.getElementById('date3').innerHTML = formatDate(date3);

// Time formatting function
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}
let currentTime = new Date();
timeElement.innerHTML = formatTime(currentTime);

async function fetchWeather(cityName) {
    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }
    let apikey = '0032902882ce2f4aeb4ba47e204a6582';
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}`;
    let response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            alert('You entered an incorrect city name. Please try again.');
        }
        return;
    }
    let data = await response.json();
    if (!data.list || data.list.length === 0) {
        alert(`No weather data available for the given city.`);
        return;
    }
    // Current weather data
    let currentTemp = data.list[0].main.temp - 273.15;
    let humidity = data.list[0].main.humidity;
    let windSpeed = data.list[0].wind.speed;
    let visibility = data.list[0].visibility / 1000;
    let description = data.list[0].weather[0].description;
    let sunrise = new Date(data.city.sunrise * 1000);
    let sunset = new Date(data.city.sunset * 1000);
    let formattedSunrise = formatTime(sunrise);
    let formattedSunset = formatTime(sunset);

    Sunrise.innerHTML = `Sunrise: ${formattedSunrise}`;
    Sunset.innerHTML = `Sunset: ${formattedSunset}`;
    Visibility.innerHTML = `Visibility: ${visibility} km`;
    WindSpeed.innerHTML = `WindSpeed: ${windSpeed} m/s`;
    Humidity.innerHTML = `Humidity: ${humidity}%`;
    deg.innerHTML = `${currentTemp.toFixed(1)}°C`;
    diapalycity.innerHTML = `${cityName}`;
    cloudstatus.innerHTML = `${description}`;

    // Set the icon based on the description
    if (description.includes('clear sky')) {
        iconshow.src = 'https://i.postimg.cc/wxtWCpsq/icons8-cloud.gif';
    } else if (description.includes('few clouds')) {
        iconshow.src = 'https://i.ibb.co/xhHVSLQ/icons8-clouds.gif';
    } else if (description.includes('scattered clouds')) {
        iconshow.src = 'https://i.ibb.co/rpfPTGN/clouds-1.png';
    } else if (description.includes('broken clouds')) {
        iconshow.src = 'https://i.postimg.cc/mktjc7ZQ/clouds-2.png';
    } else if (description.includes('shower rain')) {
        iconshow.src = 'https://i.postimg.cc/gkMLLTtR/icons8-rain.gif';
    } else if (description.includes('rain')) {
        iconshow.src = 'https://i.postimg.cc/fWqMcQZw/icons8-heavy-rain.gif';
    } else if (description.includes('thunderstorm')) {
        iconshow.src = 'https://i.postimg.cc/DZ9kNnzs/icons8-thunderstorm.gif';
    } else if (description.includes('snow')) {
        iconshow.src = 'https://i.postimg.cc/hvDw6vBX/icons8-snow.gif';
    } else if (description.includes('mist') || description.includes('haze')) {
        iconshow.src = 'https://i.postimg.cc/MpHY4Rjk/icons8-windy-weather.gif';
    } else {
        iconshow.src = 'https://i.ibb.co/PtB1Vdb/icons8-partly-cloudy-day.gif'; 
    }

    let dayTemps = [];
    let dayDescriptions = [];
    let dayIndex = 0;

    for (let i = 1; i < data.list.length; i += 8) {
        if (dayIndex < 3) {
            let temp = data.list[i].main.temp - 273.15;
            let description1 = data.list[i].weather[0].description;
            dayTemps[dayIndex] = temp;
            dayDescriptions[dayIndex] = description1;
            dayIndex++;
        }
    }
    if (dayDescriptions[0]) {
        if (dayDescriptions[0].includes('clear sky')) {
            iconshow1.src = 'https://i.postimg.cc/wxtWCpsq/icons8-cloud.gif';
        } else if (dayDescriptions[0].includes('few clouds')) {
            iconshow1.src = 'https://i.ibb.co/xhHVSLQ/icons8-clouds.gif';
        } else if (dayDescriptions[0].includes('scattered clouds')) {
            iconshow1.src = 'https://i.ibb.co/rpfPTGN/clouds-1.png';
        } else if (dayDescriptions[0].includes('broken clouds')) {
            iconshow1.src = 'https://i.postimg.cc/mktjc7ZQ/clouds-2.png';
        } else if (dayDescriptions[0].includes('shower rain')) {
            iconshow1.src = 'https://i.postimg.cc/gkMLLTtR/icons8-rain.gif';
        } else if (dayDescriptions[0].includes('rain')) {
            iconshow1.src = 'https://i.postimg.cc/fWqMcQZw/icons8-heavy-rain.gif';
        } else if (dayDescriptions[0].includes('thunderstorm')) {
            iconshow1.src = 'https://i.postimg.cc/DZ9kNnzs/icons8-thunderstorm.gif';
        } else if (dayDescriptions[0].includes('snow')) {
            iconshow1.src = 'https://i.postimg.cc/hvDw6vBX/icons8-snow.gif';
        } else if (dayDescriptions[0].includes('mist') || dayDescriptions[0].includes('haze')) {
            iconshow1.src = 'https://i.postimg.cc/MpHY4Rjk/icons8-windy-weather.gif';
        } else {
            iconshow1.src = 'https://i.ibb.co/PtB1Vdb/icons8-partly-cloudy-day.gif'; 
        }
    }

    if (dayDescriptions[1]) {
        if (dayDescriptions[1].includes('clear sky')) {
            iconshow2.src = 'https://i.postimg.cc/wxtWCpsq/icons8-cloud.gif';
        } else if (dayDescriptions[1].includes('few clouds')) {
            iconshow2.src = 'https://i.ibb.co/xhHVSLQ/icons8-clouds.gif';
        } else if (dayDescriptions[1].includes('scattered clouds')) {
            iconshow2.src = 'https://i.ibb.co/rpfPTGN/clouds-1.png';
        } else if (dayDescriptions[1].includes('broken clouds')) {
            iconshow2.src = 'https://i.postimg.cc/mktjc7ZQ/clouds-2.png';
        } else if (dayDescriptions[1].includes('shower rain')) {
            iconshow2.src = 'https://i.postimg.cc/gkMLLTtR/icons8-rain.gif';
        } else if (dayDescriptions[1].includes('rain')) {
            iconshow2.src = 'https://i.postimg.cc/fWqMcQZw/icons8-heavy-rain.gif';
        } else if (dayDescriptions[1].includes('thunderstorm')) {
            iconshow2.src = 'https://i.postimg.cc/DZ9kNnzs/icons8-thunderstorm.gif';
        } else if (dayDescriptions[1].includes('snow')) {
            iconshow2.src = 'https://i.postimg.cc/hvDw6vBX/icons8-snow.gif';
        } else if (dayDescriptions[1].includes('mist') || dayDescriptions[1].includes('haze')) {
            iconshow2.src = 'https://i.postimg.cc/MpHY4Rjk/icons8-windy-weather.gif';
        } else {
            iconshow2.src = 'https://i.ibb.co/PtB1Vdb/icons8-partly-cloudy-day.gif'; 
        }
    }

    if (dayDescriptions[2]) {
        if (dayDescriptions[2].includes('clear sky')) {
            iconshow3.src = 'https://i.postimg.cc/wxtWCpsq/icons8-cloud.gif';
        } else if (dayDescriptions[2].includes('few clouds')) {
            iconshow3.src = 'https://i.ibb.co/xhHVSLQ/icons8-clouds.gif';
        } else if (dayDescriptions[2].includes('scattered clouds')) {
            iconshow3.src = 'https://i.ibb.co/rpfPTGN/clouds-1.png';
        } else if (dayDescriptions[2].includes('broken clouds')) {
            iconshow3.src = 'https://i.postimg.cc/mktjc7ZQ/clouds-2.png';
        } else if (dayDescriptions[2].includes('shower rain')) {
            iconshow3.src = 'https://i.postimg.cc/gkMLLTtR/icons8-rain.gif';
        } else if (dayDescriptions[2].includes('rain')) {
            iconshow3.src = 'https://i.postimg.cc/fWqMcQZw/icons8-heavy-rain.gif';
        } else if (dayDescriptions[2].includes('thunderstorm')) {
            iconshow3.src = 'https://i.postimg.cc/DZ9kNnzs/icons8-thunderstorm.gif';
        } else if (dayDescriptions[2].includes('snow')) {
            iconshow3.src = 'https://i.postimg.cc/hvDw6vBX/icons8-snow.gif';
        } else if (dayDescriptions[2].includes('mist') || dayDescriptions[2].includes('haze')) {
            iconshow3.src = 'https://i.postimg.cc/MpHY4Rjk/icons8-windy-weather.gif';
        } else {
            iconshow3.src = 'https://i.ibb.co/PtB1Vdb/icons8-partly-cloudy-day.gif'; 
        }
    }

    day1deg.innerHTML = `${dayTemps[0].toFixed(1)}°C`;
    day2deg.innerHTML = `${dayTemps[1].toFixed(1)}°C`;
    day3deg.innerHTML = `${dayTemps[2].toFixed(1)}°C`;
    cloudstatus1.innerHTML = `${dayDescriptions[0]}`;
    cloudstatus2.innerHTML = `${dayDescriptions[1]}`;
    cloudstatus3.innerHTML = `${dayDescriptions[2]}`;
}
//city image
async function cityImage(cityName) {
    let apiKey = 'KhJ0OYBQEKAGOob3Dut8wYZHpcjjZnksjAMRWDRPCFb1QIb42r53bUBT';
    let url = `https://api.pexels.com/v1/search?query=${cityName}&per_page=10`;
    let response = await fetch(url, {
        headers: {
            'Authorization': apiKey
        }
    });
    if (response.ok) {
        let data = await response.json();
        if (data.photos && data.photos.length > 0) {
            let randomIndex = Math.floor(Math.random() * data.photos.length);
            let image = data.photos[randomIndex].src.original;
            document.getElementById('locationimg').src = image;
        }
    }
}

///news fetching 
async function weathernews(cityName) {
    let apikey = '49789cbc34ee1d116dd7edf92c825af4';
    let url = `https://gnews.io/api/v4/search?q=weather%20${cityName}&token=${apikey}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (data.articles && data.articles.length > 0) {
        let desp = data.articles[0].description;
        let title = data.articles[0].title;
        let articlesurl = data.articles[0].url;
        newtitle.innerHTML = `NEWS TITLE : Latest weather news for ${cityName}: ${title}`;
        newsdesp.innerHTML = `${desp}`;
        newsurl.innerHTML = `${articlesurl}`;
        newsurl.onclick = () => {
            window.open(articlesurl, '_blank');
        };
    } else {
        newtitle.innerHTML = `No recent weather news found for ${cityName}.`;
    }
}

weathernews('Kerala');
fetchWeather('Kerala');
cityImage('Kerala');
weatherdataButton.addEventListener('click', () => {
    let cityName = cityInput.value;
    fetchWeather(cityName);
    cityImage(cityName);
    weathernews(cityName);
});
