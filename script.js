const API_KEY = '014810821d5b41dfa60103041242711'; // Replace with your actual WeatherAPI key

document.getElementById('weather-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent page reload

  // Get city input and trim spaces
  const city = document.getElementById('city').value.trim();

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  try {
    // Fetch data from WeatherAPI
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
      throw new Error('City not found or API error occurred.');
    }

    const data = await response.json();

    // Display weather data
    displayWeather(data);
  } catch (error) {
    alert(error.message);
    console.error('Error fetching weather data:', error);
  }
});

function displayWeather(data) {
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('city-name').textContent = `City: ${data.location.name}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
  document.getElementById('condition').textContent = `Condition: ${data.current.condition.text}`;
  
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.src = data.current.condition.icon;
  weatherIcon.style.display = 'block';
}
