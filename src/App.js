import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=88c74e4c1b644214b5a71745242908&q=${search}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setWeatherData(data.current);
      setIsLoading(false);
    } catch (error) {
      alert("Failed to fetch weather data");
      console.log(error);
    }
  };

  return (
    <main>
      <div className="search-bar">
        <input
          placeholder="Enter city name"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" onClick={handleFetchData}>
          Search
        </button>
      </div>
      {isLoading ? (
        <p className="loader">Loading data...</p>
      ) : (
        weatherData?.temp_c && (
          <div className="weather-cards">
            <div className="weather-card">
              <p className="text">Temperature</p>
              <p className="value">{`${weatherData?.temp_c}°C`}</p>
            </div>
            <div className="weather-card">
              <p className="text">Humidity</p>
              <p className="value">{`${weatherData?.humidity}%`}</p>
            </div>
            <div className="weather-card">
              <p className="text">Condition</p>
              <p className="value">{`${weatherData?.condition?.text}`}</p>
            </div>
            <div className="weather-card">
              <p className="text">Wind Speed</p>
              <p className="value">{`${weatherData?.wind_kph} kph`}</p>
            </div>
          </div>
        )
      )}
    </main>
  );
}

export default App;
