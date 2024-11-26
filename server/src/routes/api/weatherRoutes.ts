import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (_req: Request, _res: Response) => {
  // TODO: GET weather data from city name
  WeatherService.cityName = _req.body.cityName
  // console.log(_req.body)
  const getWeatherForCity = WeatherService.getWeatherForCity(_req.body.cityName)
  _res.send(getWeatherForCity)
  // TODO: save city to search history

});

// TODO: GET search history
router.get('/history', async (_req: Request, _res: Response) => {
  _res.send(HistoryService.getCities())
});

// // * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (_req: Request, _res: Response) => {});

export default router;
