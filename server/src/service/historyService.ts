import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid'
// TODO: Define a City class with name and id properties
class City {
  name!: string
  id: string
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    //read from a searchHistory.json file if it exists, return empty array otherwise
    const readFile = await fs.readFile('db/searchHistory.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
    console.log('reading file!')
    return readFile
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities => {
      let searchHistory: City[];
      try {
        searchHistory = [].concat(JSON.parse(cities));
      } catch (err) {
        searchHistory = [];
      }
      console.log(searchHistory, 'search History')
      return searchHistory
    })
    )
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {

    if (!city) {
      throw new Error('City cannot be blank!')
    }

    const newCity: City = {
      name: city,
      id: uuidv4()
    }

    return await this.getCities().then((cities) => {
      if (cities.find((index) => index.name === city)) {
        return cities
      }
      return [...cities, newCity]
    })
      .then((updatedCities) => fs.writeFile('db/searchHistory.json', JSON.stringify(updatedCities, null, '\t')))
  }
}

// fs.appendFile('searchHistory.js', addedCity)

//What do I want this code to do?
//Take the requested city and add it to the array in searchHistory.json
//How am I going to accomplish this?
//
// * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
// async removeCity(id: string) {}
// }

export default new HistoryService;
