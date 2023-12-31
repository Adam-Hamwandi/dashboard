function updateClock() {
  const now = new Date();
  const clockElement = document.getElementById("clock");
  clockElement.innerText = now.toLocaleString();
}
// Tiden uppdateras in real time varje sekund
setInterval(updateClock, 1000);
updateClock();

// Editable title function
function makeEditable() {
  let element = document.getElementById("editableTitle");
  element.contentEditable = true;
  element.focus();
}

// Lägger till det nya rubriken när användarna skriver och trycker enter
document
  .getElementById("editableTitle")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.contentEditable = false;

      let editedTitle = this.innerText;
      saveChangesToLocalStorage("saveTitle", editedTitle);
    }
  });

function saveChangesToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

// Adda länkar

function addLink() {
  const linkUrl = prompt("Ange länkens URL:");
  const linkTitle = prompt("Ange länkens rubrik:");

  // Skapa ett element för länken
  const linkElement = document.createElement("a");
  linkElement.href = linkUrl;
  linkElement.textContent = linkTitle;

  // Lägg till elementet i containern
  document.getElementById("links").appendChild(linkElement);
}

// Detta är för att ta bort länkarna
function removeLastLink() {
  const linksContainer = document.getElementById("links");
  const lastLink = linksContainer.lastChild;

  if (lastLink) {
    linksContainer.removeChild(lastLink);
  } else {
    alert("Inga länkar att ta bort.");
  }
}

// Väder
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function getWeather(position) {
  const apiKey = "1b0f4ab740faf4422744304517103099";
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      // Hantera och visa väderdata i DOM här
      const weatherContainer = document.getElementById("weather");
      const city = data.name;
      const country = data.sys.country;
      const temperature = data.main.temp;

      weatherContainer.innerHTML = `City: ${city}, Country: ${country}<br>Temperatur: ${temperature}°C`;
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

getLocation();

// Sök funktion
function searchWeather() {
  const locationInput = document.getElementById("locationInput").value;
  if (locationInput.trim() === "") {
    alert("Ange en plats för att söka väder.");
    return;
  }

  const apiKey = "1b0f4ab740faf4422744304517103099";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherContainer = document.getElementById("weather");

      if (data.cod === "404") {
        alert("Platsen kunde inte hittas. Försök igen med en annan plats.");
        weatherContainer.innerHTML = "";
      } else {
        const city = data.name;
        const country = data.sys.country;
        const temperatureKelvin = data.main.temp;
        const temperatureCelsius = Math.round(temperatureKelvin - 273.15); // Avrunda till närmaste heltal

        weatherContainer.innerHTML = `City: ${city}, Country: ${country}<br>Temperatur: ${temperatureCelsius}°C`;
      }
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

// Anteckningar
const notesTextArea = document.getElementById("notes");

// Hämta anteckningar från LocalStorage när sidan laddas om
notesTextArea.value = localStorage.getItem("savedNotes") || "";
notesTextArea.addEventListener("input", function () {
  // Spara anteckningar i LocalStorage när användaren skriver
  const notesContent = notesTextArea.value;
  localStorage.setItem("savedNotes", notesContent);
});

// Slumpa bakgrundsbild

function getRandomImage() {
  const accessKey = "rW802OROek9WFAfmFOF7NQSijiI0DaoAjGfH4m4_9EE";
  const apiUrl = `https://api.unsplash.com/photos/?client_id=rW802OROek9WFAfmFOF7NQSijiI0DaoAjGfH4m4_9EE=${accessKey}`;

  fetch(apiUrl)
    .then((response) => {
      console.log("Response status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);
      let mainElement = document.getElementById("main");

      if (data.urls && data.urls.full) {
        let imageUrl = data.urls.full;
        mainElement.style.backgroundImage = `url(${imageUrl})`;
      } else {
        console.error("Error fetching image data:", data);
      }
    })
    .catch((error) => console.error("Error fetching image:", error));
}
