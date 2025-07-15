import { Router } from 'express';

import { cacheMiddleware } from '../middleware/index.js';

import { NASA_EARTH_BASE_URL } from '../constants/index.js';

const router = Router();

/**
 * Converts geographic latitude and longitude to tile coordinates (x, y) for a given zoom level.
 *
 * This function assumes a simple equirectangular projection (EPSG:4326) and divides the map into
 * a grid of tiles at the specified zoom level.
 *
 * @param {number|string} lat - Latitude in degrees (can be string or number, should be between -90 and 90).
 * @param {number|string} lon - Longitude in degrees (can be string or number, should be between -180 and 180).
 * @param {number} zoom - Zoom level (positive integer, typically between 0 and 10).
 * @returns {{ x: number, y: number }} - Tile coordinates corresponding to the input lat/lon at the given zoom level.
 *
 * @example
 * latLonToTile(34.05, -118.25, 2); // → { x: 0, y: 0 }
 */
const latLonToTile = (lat, lon, zoom) => {
  const tiles = Math.pow(2, zoom);
  const x = Math.floor((Number(lon) + 180) / 360 * tiles);
  const y = Math.floor((90 - Number(lat)) / 180 * tiles);
  return { x, y };
};

/**
 * Generates a NASA Earth imagery tile URL based on geographic coordinates and date.
 *
 * @param {string} date - The date for the satellite image in `YYYY-MM-DD` format.
 * @param {number|string} lat - Latitude of the location (can be number or string, will be parsed).
 * @param {number|string} lon - Longitude of the location (can be number or string, will be parsed).
 * @param {number} [zoom=2] - Zoom level for the tile (default is 2).
 * @param {string} [layer='MODIS_Terra_CorrectedReflectance_TrueColor' | 'VIIRS_Black_Marble' | 'MODIS_Terra_Thermal_Anomalies_All' | 'VIIRS_Night_Lights'] - NASA imagery layer name.
 * @returns {string} - A formatted URL pointing to the Earth imagery tile.
 *
 * @example
 * fetchEarthImage('2023-09-01', 34.05, -118.25);
 * // → 'https://.../MODIS_Terra_CorrectedReflectance_TrueColor/default/2023-09-01/250m/2/3/4'
 */
const fetchEarthImage = (date, lat, lon, zoom = 2, layer = 'MODIS_Terra_CorrectedReflectance_TrueColor') => {

    const { x, y } = latLonToTile(Number(lat), Number(lon), zoom);

    return `${NASA_EARTH_BASE_URL}/wmts/epsg4326/best/${layer}/default/${date}/250m/${zoom}/${y}/${x}`;
};

/**
 * Estimates the Moon phase for a given date using a simplified lunar cycle model.
 *
 * @param {string} date - A date string representing the observation date.
 * @returns {string} - A textual description of the moon phase (e.g., 'Full Moon', 'Waxing Crescent').
 *
 * @example
 * getMoonPhase('2025-07-15'); // → 'Waxing Gibbous'
 */
const getMoonPhase = (date) => {
  const d = new Date(date);
  const moonCycle = 29.53; // Average length of lunar cycle in days
  const knownNewMoon = new Date('2000-01-06T18:14:00Z'); // Reference new moon date
  const daysSince = (d - knownNewMoon) / (1000 * 60 * 60 * 24); // Days since known new moon
  const phase = daysSince % moonCycle;

  if (phase < 1) return 'New Moon';
  if (phase < 7) return 'Waxing Crescent';
  if (phase < 8) return 'First Quarter';
  if (phase < 14) return 'Waxing Gibbous';
  if (phase < 15) return 'Full Moon';
  if (phase < 22) return 'Waning Gibbous';
  if (phase < 23) return 'Last Quarter';
  return 'Waning Crescent';
};

export default router.get('/', cacheMiddleware(req => `apod_${req.query.date}_${req.query.lat}_${req.query.lon}`, async (req) => {

    const { date, lat, lon } = req.query;

    if (!date || !lat || !lon) {
        const error = new Error('Missing required query parameters: date, lat, lon');
        error.status = 400;
        throw error;
    }

    return {
        earth: {
            imageUrl: fetchEarthImage(date, lat, lon)
        },
        sky: {
            iframeUrl: `https://virtualsky.lco.global/embed/index.html?longitude=${lon}&latitude=${lat}&constellations=true&gridlines_az=true&live=false&clock=false&projection=stereo&showposition=true&cardinalpoints=true&ecliptic=true&clock=${date}T00:00:00`,
            moonPhase: getMoonPhase(date)
        }
    };
  }
));