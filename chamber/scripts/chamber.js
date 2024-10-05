// adding the year and last modified to the footer 

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

// adding the funcionality to the ham button 

const hamButton = document.querySelector('#menu');
const navMenu = document.querySelector('.open-menu');
const header = document.querySelector('.header')

hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('open');
    navMenu.classList.toggle('open');
    header.classList.toggle('gap')
})

//Directory page scripts 



const url = './data/members.json' // fetching the members data from the Json file

const cards = document.querySelector('#cards-section');

const getMembersData = async () => {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error (`Response status: ${response.status}`)
        }

        const data = await response.json();
        return data
    }

    catch (error) {
        console.error(error.message)
    }
}
 


const displayMembersData = (membersData) => {   // Creating the function to display the members data in the directory page
    membersData.forEach (member => {
        let card = document.createElement('article');
        let companyName = document.createElement('h3');
        let companyLogo = document.createElement('img');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p')
        let websiteUrl = document.createElement('a');

        companyName.textContent = `${member.name}`;
        address.textContent = `${member.address}`;
        phoneNumber.textContent = `${member.phoneNumber}`;
        websiteUrl.textContent = 'Visit Website';

        websiteUrl.setAttribute('href', member.websiteUrl)
        
        companyLogo.setAttribute('src', member.image);
        companyLogo.setAttribute('alt', `Logo of ${member.name}`);
        companyLogo.setAttribute('loading', 'lazy');
        companyLogo.setAttribute('width', '200');
        companyLogo.setAttribute('height', '200');

   
        websiteUrl.classList.add('card-button')
        card.appendChild(companyLogo);
        card.appendChild(companyName);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(websiteUrl);

        cards.classList.add('grid-view')
        cards.appendChild(card);

    })
}

const membersDirectory = async (data) => {
    let members = await getMembersData();

    displayMembersData(members);
}

// Home Page scripts 

const weatherIcon = document.createElement('img');
const weatherDisplay = document.querySelector('.weather-display')
const weatherInfo = document.querySelector('#weather-info');
const forecastInfo = document.querySelector('#forecast-weather-info');
const advertising = document.querySelector('#advertising');

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=12.113560033331286&lon=-86.2354811759951&appid=e4ecd0c975a7d843f411d8205c8a8aa3&units=metric';

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=12.113560033331286&lon=-86.2354811759951&cnt=24&&appid=e4ecd0c975a7d843f411d8205c8a8aa3&units=metric`

const fecthingCurrentWeatherData = async () => {
    try {
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error (`Response status: ${weatherResponse.status}`)
        }

        const weatherData = await weatherResponse.json();
        console.log(weatherData)
        return weatherData
    }

    catch (error) {
        console.log(error.message);
    }
}

const fetchingForecastWeather = async () => {
    try {
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error (`Response status: ${forecastResponse.status}`)
        }

        const forecastData = await forecastResponse.json();
        return forecastData
    }

    catch (error) {
        console.log(error.message);
    }
}

const averageForecastTemp = async () => {
    const forecastData = await fetchingForecastWeather();

    const firstDayForecastData = forecastData.list.slice(0, 8);
    let firstDay = 0;
    const firstDayAverageTemp = firstDayForecastData.reduce((total, day) => total + day.main.temp, 0) / firstDayForecastData.length;

    const secondDayForecastData = forecastData.list.slice(8,16)
    let secondDay = 0;
    const secondDayAverageTemp = secondDayForecastData.reduce((total, day) => total + day.main.temp, 0) / secondDayForecastData.length;

    const thirdDayForecastData = forecastData.list.slice(16,24);
    let thirdDay = 0;
    const thirdDayAverageTemp = thirdDayForecastData.reduce((total, day) => total + day.main.temp, 0) / thirdDayForecastData.length;
    
    const firstDayData = {
        "temp": firstDayAverageTemp,
        "date": firstDayForecastData[0].dt_txt
    };

    const secondDayData = {
        "temp": secondDayAverageTemp,
        "date": secondDayForecastData[0].dt_txt
    };
    
    const thirdDayData = {
        "temp": thirdDayAverageTemp,
        "date": thirdDayForecastData[0].dt_txt
    };

    return {
        firstDayData,
        secondDayData,
        thirdDayData
    };
}


async function populatingForecastWeather() {
    const { firstDayData, secondDayData, thirdDayData } = await averageForecastTemp();

    forecastInfo.innerHTML = `
        <li>Tomorrow: <strong>${firstDayData.temp.toFixed(0)}&deg;C</strong></li>
        <li>${new Date(secondDayData.date).toLocaleString('en-US', { weekday: 'long' })}: <strong>${secondDayData.temp.toFixed(0)}&deg;C</strong></li>
        <li>${new Date(thirdDayData.date).toLocaleString('en-US', { weekday: 'long' })}: <strong>${thirdDayData.temp.toFixed(0)}&deg;C</strong></li>
    `;
}


function populatingCurrentWeather (data){
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
    weatherIcon.setAttribute('alt', 'The curretn weather icon');
    weatherIcon.setAttribute('width', 150);
    weatherIcon.setAttribute('height', 150);
    weatherDisplay.appendChild(weatherIcon);

    const sunriseTimestamp = data.sys.sunrise; 
    const sunsetTimestamp = data.sys.sunset;

    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);

    const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    weatherInfo.innerHTML = `
        <p><strong>${data.main.temp}&deg;</strong> C</p>
        <p>${data.weather[0].description}</p>
        <p>High: ${data.main.temp_max}&deg;</p>
        <p>Low: ${data.main.temp_min}&deg;</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Sunrise: ${sunriseTime}</p>
        <p>Sunset: ${sunsetTime}</p>
    `
}

const displayCurrentWeather = async () => {
    const weatherData = await fecthingCurrentWeatherData();

    populatingCurrentWeather(weatherData);
}

function shuffleCompanies(companies) {
    return companies.sort(() => Math.random() - 0.5);
}

const randomAdvertising = async () => {

    const membersData = await getMembersData ();
    const filteredCompanies = await membersData.filter(company => company.membershipLvl >= 2)
    const randomCompanies = shuffleCompanies(filteredCompanies);
    const selectedCompanies = randomCompanies.slice(0, 3);

    selectedCompanies.forEach(company => {
        advertising.innerHTML += `
        <article class="home-card ads">
        <div class="advertising-card-title">
            <h3>${company.name}</h3>
            <p>${company.tagline}</p>
        </div>
        
        <div class="advertising-info">
            <img src="${company.image}" alt="The icon of ${company.name}" width="110" height="110">
            <div>
                <p>Email: ${company.email}</p>
                <p>Phone: ${company.phoneNumber}</p>
                <a href="${company.websiteUrl}">${company.websiteUrl}</a>
            </div>
        </div>

    </article>
        `
    })
    
   
}

randomAdvertising();

//Adding the addEventListener and conditinals to manage the scripts acroos the diferent pages

document.addEventListener('DOMContentLoaded', ()=> {  
    if(document.body.id === 'directory-page') {
        membersDirectory()

        const gridButton = document.querySelector('#gridButton');
        const listButton = document.querySelector('#listButton');


        const swapingViews = (button) => {
            
            if (button === 'list'){
            gridButton.classList.remove('grid-button'); 
            listButton.classList.add('list-button')

            cards.classList.remove('grid-view');
            cards.classList.add('list-view');

            
            

            }

            if (button=== 'grid') {
                gridButton.classList.add('grid-button');
                listButton.classList.remove('list-button');

                cards.classList.add('grid-view');
                cards.classList.remove('list-view');
            }
            

            
        }

        gridButton.addEventListener('click', () =>{
            swapingViews('grid');
        })

        listButton.addEventListener('click', ()=> {
            swapingViews('list');
        })
    }

    if(document.body.id === 'home-page') {
       
        
        displayCurrentWeather();
        populatingForecastWeather();
    }

    
})


