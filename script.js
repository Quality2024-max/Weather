const apiKey = "0f82ef29b1392f6efe3905a7bc60423f"; // regenerate this

async function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    alert("Enter city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod != 200) {
      alert(data.message);
      return;
    }

    // 📍 City
    document.getElementById("cityName").innerText = data.name;

    // 🖼 City Image
    setCityImage(data.name);

    // 🌥 Condition
    const condition = data.weather[0].main;
    document.getElementById("condition").innerText = "Condition: " + condition;

    // 💧 Humidity
    document.getElementById("humidity").innerText =
      "Humidity: " + data.main.humidity + "%";

    // 🌤 Icon
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.getElementById("icon").innerHTML =
      `<img src="${iconUrl}" alt="weather icon">`;

    // 🎨 Background
    document.body.className = "";

    if (condition === "Clear") {
      document.body.classList.add("sunny");
    } else if (condition === "Clouds") {
      document.body.classList.add("clouds");
    } else if (condition === "Rain") {
      document.body.classList.add("rain");
    } else if (condition === "Snow") {
      document.body.classList.add("snow");
    } else {
      document.body.classList.add("default");
    }
  } catch (err) {
    alert("Error fetching weather");
    console.error(err);
  }
}

// 🖼 Image Function (FIXED + FALLBACK)
const pexelsKey = "2F1lhO9CDI8MGXAcaRmgf9REz8RuyHo5sJGGXAEGtlnjWGQttlUBXizh"; // 🔑 add here

async function setCityImage(city) {
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(city + " city skyline")}&per_page=1`;

    const res = await fetch(url, {
      headers: {
        Authorization: pexelsKey,
      },
    });

    const data = await res.json();

    if (data.photos && data.photos.length > 0) {
      const imageUrl = data.photos[0].src.large;

      document.getElementById("cityImage").innerHTML =
        `<img src="${imageUrl}" alt="city image">`;
    } else {
      showFallbackImage();
    }
  } catch (error) {
    console.error("Image API error:", error);
    showFallbackImage();
  }
}
