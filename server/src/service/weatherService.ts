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
  date!: string;
  icon!: string;
  iconDescription!: string;
  tempF!: number;
  windSpeed!: number;
  humidity!: number;

  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity
  }
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
    console.log(`Lat for city: ${lat}\nLon for city: ${lon}`);
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    return weatherQuery
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData() {
    const weatherDataFetch = await this.buildWeatherQuery()
    const weatherDataResp = await fetch(weatherDataFetch);
    const weatherData = await weatherDataResp.json();
    console.log(weatherData, "hi")
    return weatherData;
  }
  // TODO: Build parseCurrentWeather method
  private async parseCurrentWeather() {
    const currentWeatherFetch = await this.fetchWeatherData();
    //console.log(currentWeatherFetch);

    //const currentWeather = await currentWeatherFetch
    //console.log(currentWeather, 'current weather')
    return currentWeatherFetch
  }
  // TODO: Complete buildForecastArray method
  private async buildForecastArray() {
    const forecast: Weather[] = []
    const weatherInfo = await this.parseCurrentWeather()
    // const smallWeather = [currentWeather.list[0], currentWeather.list[1], currentWeather.list[2]];
    // console.log(smallWeather)

    for  (let i = 0; i < weatherInfo.list.length; i++) {
      const weatherObj = new Weather (
        weatherInfo.city.name, // City
        weatherInfo.list[i].dt_txt, // Date
        weatherInfo.list[i].weather[0].icon, // Icon
        weatherInfo.list[i].weather[0].description, // Icon Description
        weatherInfo.list[i].main.temp, // TempF
        weatherInfo.list[i].wind.speed,
        weatherInfo.list[i].main.humidity, // Humidity
    )
    forecast.push(weatherObj)
    }
    // const forecast: Weather[] = weatherInfo.list.map((weather: any, index: number) => {
    //   // console.log(weather)
    // return  [
    // index,
    // this.cityName,
    // weather.dt_txt,
    // weather.weather[0].icon,
    // weather.weather[0].description,
    // weather.main.temp,
    // weather.wind.speed,
    // weather.main.humidity
    //   ]
    // })
    // const forecast = currentWeather.list.map((weather: Weather, index: number) => {
    //   [
    //     index,
    //     weather.city,
    //     weather.date,
    //     weather.icon,
    //     weather.iconDescription,
    //     weather.tempF,
    //     weather.windSpeed,
    //     weather.humidity
    //   ]
    // })
    console.log(forecast, 'forecast')
    // console.log(forecast.length);
    // console.log(Weather)
    return forecast;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(cityName: string) {
    console.log("Getting weather for city: ", cityName);
    this.cityName = cityName
    const weather = await this.buildForecastArray()
    return weather
  }
}

export default new WeatherService;
//UNUSED METHODS (REDUNDANT)
// private async fetchLocationData(query: string) {}
// private destructureLocationData(locationData: Coordinates): Coordinates {}

