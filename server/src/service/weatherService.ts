import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
// interface Coordinates {
//   lat: number | undefined
//   lon: number | undefined
// }
// TODO: Define a class for the Weather object
class Weather {
  city!: string;
  date!: number;
  icon!: ImageBitmap;
  iconDescription!: string;
  tempF!: number;
  wind!: number;
  humidity!: number;
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL = process.env.API_BASE_URL
  apiKey = process.env.API_KEY
  cityName: string | undefined

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    const geoCodeQuery = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`
    return geoCodeQuery;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationDataResp = await fetch(this.buildGeocodeQuery())
    
    const locationData = await locationDataResp.json()
    console.log(locationData, "Location Data");
    const lat = locationData[0].lat
    const lon = locationData[0].lon
    return { lat, lon }
  }

  // TODO: Create buildWeatherQuery method
  private async buildWeatherQuery() {
    const { lat, lon } = await this.fetchAndDestructureLocationData()
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    return weatherQuery
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData() {
    const weatherDataFetch = await this.buildWeatherQuery()
    const weatherDataResp = await fetch(weatherDataFetch);
    console.log(weatherDataResp, "weatherDataResp")
    const weatherData = await weatherDataResp.json();
    console.log(weatherData, 1)
    return weatherData;
  }
  // TODO: Build parseCurrentWeather method
  private async parseCurrentWeather() {
    const currentWeatherFetch = await this.fetchWeatherData();
    console.log(currentWeatherFetch);
    const currentWeather = await JSON.parse(currentWeatherFetch)
    return currentWeather
  }
  // TODO: Complete buildForecastArray method
  private async buildForecastArray() {
    const currentWeather = await this.parseCurrentWeather()
    const forecast = currentWeather.map((weather: Weather) => {
      [
        weather.tempF,
        weather.wind,
        weather.humidity
      ]
    })
    return forecast
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(cityName: string) {
    this.cityName = cityName
    const weather = await this.buildForecastArray()
    return weather
  }
}

export default new WeatherService;
//UNUSED METHODS (REDUNDANT)
// private async fetchLocationData(query: string) {}
// private destructureLocationData(locationData: Coordinates): Coordinates {}

