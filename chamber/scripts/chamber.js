const yearElem = document.querySelector("#currentyear");
const lastModElem = document.querySelector("#lastModified");

yearElem.textContent = new Date().getFullYear();
lastModElem.textContent = document.lastModified;

const menuBtn = document.querySelector('#menu');
const menuNav = document.querySelector('.open-menu');
const headerElem = document.querySelector('.header');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    menuNav.classList.toggle('open');
    headerElem.classList.toggle('gap');
});

const jsonDataUrl = './data/members.json';
const cardsSection = document.querySelector('#cards-section');

const fetchData = async () => {
    try {
        const res = await fetch(jsonDataUrl);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(err.message);
    }
};

const displayData = (data) => {
    data.forEach(({ name, address, phone, website, image }) => {
        const cardElem = document.createElement('article');
        const companyElem = document.createElement('h3');
        const logoElem = document.createElement('img');
        const addressElem = document.createElement('p');
        const phoneElem = document.createElement('p');
        const websiteElem = document.createElement('a');

        companyElem.textContent = name;
        addressElem.textContent = address;
        phoneElem.textContent = phone;
        websiteElem.textContent = 'Visit Website';

        websiteElem.href = website;
        logoElem.src = image;
        logoElem.alt = `Logo of ${name}`;
        logoElem.loading = 'lazy';
        logoElem.width = 200;
        logoElem.height = 200;

        websiteElem.classList.add('card-button');
        cardElem.append(logoElem, companyElem, addressElem, phoneElem, websiteElem);

        cardsSection.classList.add('grid-view');
        cardsSection.appendChild(cardElem);
    });
};

const initDirectory = async () => {
    const members = await fetchData();
    displayData(members);
};

const weatherIcon = document.createElement('img');
const weatherContainer = document.querySelector('.weather-display');
const weatherDetails = document.querySelector('#weather-info');
const forecastDetails = document.querySelector('#forecast-weather-info');
const adContainer = document.querySelector('#advertising');

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=40.711073817942136&lon=-74.02917339660162&appid=4c37122ddbb92926b645b1a37943df60&units=metric';
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.711073817942136&lon=-74.02917339660162&cnt=24&&appid=4c37122ddbb92926b645b1a37943df60&units=metric';

const fetchWeatherData = async (url) => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(err.message);
    }
};

const calculateAvgTemp = async () => {
    const forecastData = await fetchWeatherData(forecastApiUrl);
    const getAvgTemp = (start, end) => {
        const dataSlice = forecastData.list.slice(start, end);
        return dataSlice.reduce((acc, curr) => acc + curr.main.temp, 0) / dataSlice.length;
    };
    return [
        { temp: getAvgTemp(0, 8), date: forecastData.list[0].dt_txt },
        { temp: getAvgTemp(8, 16), date: forecastData.list[8].dt_txt },
        { temp: getAvgTemp(16, 24), date: forecastData.list[16].dt_txt },
    ];
};

const showForecast = async () => {
    const [day1, day2, day3] = await calculateAvgTemp();
    forecastDetails.innerHTML = `
        <li>Tomorrow: <strong>${day1.temp.toFixed(0)}&deg;C</strong></li>
        <li>${new Date(day2.date).toLocaleString('en-US', { weekday: 'long' })}: <strong>${day2.temp.toFixed(0)}&deg;C</strong></li>
        <li>${new Date(day3.date).toLocaleString('en-US', { weekday: 'long' })}: <strong>${day3.temp.toFixed(0)}&deg;C</strong></li>
    `;
};

const showCurrentWeather = (data) => {
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    weatherIcon.alt = 'Weather icon';
    weatherIcon.width = 150;
    weatherIcon.height = 150;
    weatherContainer.appendChild(weatherIcon);

    const { sunrise, sunset } = data.sys;
    const formatTime = (timestamp) => new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    weatherDetails.innerHTML = `
        <p><strong>${data.main.temp}&deg;</strong> C</p>
        <p>${data.weather[0].description}</p>
        <p>High: ${data.main.temp_max}&deg;</p>
        <p>Low: ${data.main.temp_min}&deg;</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Sunrise: ${formatTime(sunrise)}</p>
        <p>Sunset: ${formatTime(sunset)}</p>
    `;
};

const loadCurrentWeather = async () => {
    const data = await fetchWeatherData(weatherApiUrl);
    showCurrentWeather(data);
};

const randomizeCompanies = (companies) => companies.sort(() => Math.random() - 0.5);

const displayAds = async () => {
    const membersData = await fetchData();
    const featuredCompanies = randomizeCompanies(membersData.filter(c => c.membership_level >= 2)).slice(0, 3);

    featuredCompanies.forEach(({ name, address, phone, website, image }) => {
        adContainer.innerHTML += `
            <article class="home-card ads">
                <div class="advertising-card-title">
                    <h3>${name}</h3>
                </div>
                <div class="advertising-info">
                    <img src="${image}" alt="Company logo" width="110" height="110">
                    <div>
                        <p>Address: ${address}</p>
                        <p>Phone: ${phone}</p>
                        <a href="${website}">${website}</a>
                    </div>
                </div>
            </article>
        `;
    });
};

displayAds();

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.id === 'directory-page') {
        initDirectory();

        const gridBtn = document.querySelector('#gridButton');
        const listBtn = document.querySelector('#listButton');

        const toggleView = (viewType) => {
            if (viewType === 'list') {
                gridBtn.classList.remove('grid-button');
                listBtn.classList.add('list-button');
                cardsSection.classList.remove('grid-view');
                cardsSection.classList.add('list-view');
            } else {
                gridBtn.classList.add('grid-button');
                listBtn.classList.remove('list-button');
                cardsSection.classList.add('grid-view');
                cardsSection.classList.remove('list-view');
            }
        };

        gridBtn.addEventListener('click', () => toggleView('grid'));
        listBtn.addEventListener('click', () => toggleView('list'));
    }

    if (document.body.id === 'home-page') {
        loadCurrentWeather();
        showForecast();
    }
});
