import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (_req: Request, res: Response) => {
  // TODO: GET weather data from city name
  WeatherService.cityName = _req.body.cityName
  // console.log(_req.body)
  const getWeatherForCity = await WeatherService.getWeatherForCity(_req.body.cityName)
  // console.log("WTF tho", getWeatherForCity, "I SAID");
  res.json(getWeatherForCity)
  // TODO: save city to search history
  HistoryService.addCity(_req.body.cityName)
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  const searchHistory = await HistoryService.getCities()
  console.log('Search history route is working!')
  res.json(searchHistory)
});

// // * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (_req: Request, _res: Response) => {});

export default router;
