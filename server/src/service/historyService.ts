import fs from 'node:fs/promises';
// TODO: Define a City class with name and id properties
  class City {
    name : string | undefined;
    id: string | undefined;
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
    return await fs.readFile('db/searchHistory.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities => {
      let parsedCities: City[];
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch(err) {
        parsedCities = [];
      }
      console.log(parsedCities)
    })
  )
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity() {
    await this.getCities().then(() => {
      // const addedCity = new City {
      //   name: "",
      //   id: ""
      // }
     
      })
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
