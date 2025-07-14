import { Router } from 'express';

import axios from 'axios';

import { cacheMiddleware } from '../middleware/index.js';

import { NASA_BASE_URL } from '../constants/index.js';

const router = Router();

export default router.get('/', cacheMiddleware(
  req => `apod_${req.query.date}`,
  async (req) => {
    const { date } = req.query;
    const response = await axios.get(`${NASA_BASE_URL}/planetary/apod`, {
      params: {
        api_key: process.env.NASA_API_KEY,
        date,
      },
    });
    return response.data;
  }
));