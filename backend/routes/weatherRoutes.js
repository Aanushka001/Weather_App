import express from 'express';
import { 
  getWeather, 
  getSearchHistory, 
  deleteSearchHistory, 
  getWeatherForecast 
} from '../controllers/weatherController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/current', verifyToken, getWeather);

router.get('/search-history', verifyToken, getSearchHistory);

router.delete('/weather/search-history/:id', verifyToken, deleteSearchHistory);
router.get('/weather/forecast', verifyToken, getWeatherForecast);

export default router;
