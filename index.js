const cryptoTop = document.getElementById("crypto-top");
const crypto = document.getElementById("crypto");
const time = document.getElementById("time");
const weather = document.getElementById("weather");

async function getImage() {
  try {
    const response = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    );
    const data = await response.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    author.textContent = `Photo by ${data.user.name}`;
  } catch (error) {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1684690640456-381bc7183e86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80)`;
    author.textContent = "Photo by Marek Piwnicki";
  }
}

async function coinData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/dogecoin"
    );
    const data = await response.json();
    cryptoTop.innerHTML = `<img src="${data.image.small}" ?> <span>${data.name}`;
    crypto.innerHTML += `
     <p>🎯: $${data.market_data.current_price.usd}</p>
     <p>👆: $${data.market_data.high_24h.usd}</p>
     <p>👇: $${data.market_data.low_24h.usd}</p>
    `;
  } catch {
    console.log("Error");
  }
}

function setTime() {
  const date = new Date();
  time.innerHTML = date.toLocaleTimeString("en-US", { timeStyle: "short" });
}

setInterval(setTime, 500);

async function getWeather() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const response = await fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
    );
    data = await response.json();
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weather.innerHTML += `
 
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>

            
            
        `;
  });
}

getWeather();
getImage();
coinData();
