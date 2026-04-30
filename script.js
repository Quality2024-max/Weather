// 🔑 API Keys
const apiKey = "0f82ef29b1392f6efe3905a7bc60423f";
const pexelsKey = "2F1lhO9CDI8MGXAcaRmgf9REz8RuyHo5sJGGXAEGtlnjWGQttlUBXizh";

// 🌄 Default Image (local or online)
const defaultImage = "jagannath-temple-kanpur-uttar-pradesh-1-attr-hero.jpg";

// 🌐 Page Load → Show default image
window.onload = function () {
  showDefaultImage();
};

// 🌦 Get Weather Function
async function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
    );

    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    // 📊 Weather Data Show
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = `🌡️ Temp: ${data.main.temp}°C`;
    document.getElementById("desc").innerText =
      `🌥️ ${data.weather[0].description}`;
    document.getElementById("humidity").innerText =
      `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText =
      `🌬️ Wind: ${data.wind.speed} km/h`;

    // 🖼 Load city image
    setCityImage(city);
  } catch (error) {
    console.error("Weather API error:", error);
    alert("Error fetching weather data");
  }
}

// 🖼 Fetch City Image (Pexels API)
async function setCityImage(city) {
  try {
    // 🔄 Loading state
    document.getElementById("cityImage").innerHTML = "<p>Loading image...</p>";

    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(city + " skyline")}&per_page=1`;

    const res = await fetch(url, {
      headers: {
        Authorization: pexelsKey,
      },
    });

    const data = await res.json();

    if (data.photos && data.photos.length > 0) {
      const imageUrl = data.photos[0].src.large;

      document.getElementById("cityImage").innerHTML = `<img src="${imageUrl}" 
         alt="city image"
         style="width:100%; border-radius:10px; margin-top:10px; object-fit:cover;">`;
    } else {
      showDefaultImage();
    }
  } catch (error) {
    console.error("Image API error:", error);
    showDefaultImage();
  }
}

// 🌄 Default Image Function
function showDefaultImage() {
  document.getElementById("cityImage").innerHTML = `<img src="${defaultImage}" 
     alt="default image"
     onerror="this.src='jagannath-temple-kanpur-uttar-pradesh-1-attr-hero.jpg'"
     style="width:100%; border-radius:10px; margin-top:10px; object-fit:cover;">`;
}

// ⌨️ Enter Key Support
document.getElementById("city").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});
