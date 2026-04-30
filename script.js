const apiKey = "0f82ef29b1392f6efe3905a7bc60423f"; // OpenWeather API
const pexelsKey = "2F1lhO9CDI8MGXAcaRmgf9REz8RuyHo5sJGGXAEGtlnjWGQttlUBXizh"; // Pexels API

async function getWeather() {
  const city = document.getElementById("city").value;

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    // 🌦 Weather Data Show
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = `🌡️ Temp: ${data.main.temp}°C`;
    document.getElementById("desc").innerText =
      `🌥️ ${data.weather[0].description}`;
    document.getElementById("humidity").innerText =
      `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText =
      `🌬️ Wind: ${data.wind.speed} km/h`;

    // 🖼 Call Image Function
    setCityImage(city);
  } catch (error) {
    alert("Error fetching weather data");
    console.error(error);
  }
}

// 🖼 Image Function
async function setCityImage(city) {
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(city + " skyline")}&per_page=1`;

    const res = await fetch(url, {
      headers: {
        Authorization: pexelsKey,
      },
    });

    const data = await res.json();

    if (data.photos && data.photos.length > 0) {
      const imageUrl = data.photos[0].src.large;

      document.getElementById("cityImage").innerHTML =
        `<img src="${imageUrl}" alt="city image" style="width:100%; border-radius:10px; margin-top:10px;">`;
    } else {
      showFallbackImage();
    }
  } catch (error) {
    console.error("Image API error:", error);
    showFallbackImage();
  }
}

// ⚠️ Fallback Image
function showFallbackImage() {
  document.getElementById("cityImage").innerHTML =
    `<img src="https://via.placeholder.com/400x250?text=No+Image+Found" 
     style="width:100%; border-radius:10px; margin-top:10px;">`;
}

// ⌨️ Enter key support
document.getElementById("city").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});
