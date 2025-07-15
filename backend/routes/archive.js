import { Router } from 'express';

import axios from 'axios';

import { from, of, switchMap, map, catchError, lastValueFrom } from 'rxjs';

import { cacheMiddleware } from '../middleware/index.js';

import {
  NASA_IMAGE_BASE_URL
} from '../constants/index.js';

const router = Router();

const extensions = ['.mp4', '.webm', '.mov', '.mkv', '.avi'];

const pluckVideo = (data) => {
  return data.find(item => {
    const url = item.href.toLowerCase();
    return extensions.some(ext => url.endsWith(ext));
  });
}

const fetchUrl = (items, type) => {
  switch(type) {
    case 'video':
      return pluckVideo(items)?.href;
    case 'image':
      return items[0].href;
    case 'audio':
      /** @todo ~ graceful fall back based on extention */
      return items[0].href;
    default:
        break;
  }
}

const formatDate = (input) => {
  const date = new Date(input);

  if (isNaN(date)) return null; // Invalid date check

  return `${date.toISOString().split('T')[0]}`;
};

const getThumbnail = (links) => {
  if (!Array.isArray(links) || links.length === 0) return undefined;

  /** @note ~  Try to find the "preview" image */ 
  const preview = links.find(link => link.rel === 'preview' && link.render === 'image');
  if (preview) return preview.href;

  /** @note ~ Fallback: return the first "image" entry */
  const firstImage = links.find(link => link.render === 'image');
  return firstImage?.href;
}

const ITEMS_PER_PAGE = 12

router.get('/', cacheMiddleware(
  req => `archive_${req.query.q}_${req.query.page}`,
  async (req) => {

    const { q, page } = req.query;

    const response = await axios.get(`${NASA_IMAGE_BASE_URL}/search`, {
      params: {
        q,
        page: page || 1,
        page_size: ITEMS_PER_PAGE
      },
    });

    const assets = response.data && response.data.collection?.items ? response.data.collection.items.map((item) => ({
      id: item.data[0].nasa_id,
      title: item.data[0].title,
      date_created: formatDate(item.data[0].date_created),
      thumb: item.data[0].media_type === 'audio' ? 'https://cdn.codebrew.cc/img/audio.png' : getThumbnail(item.links),
      type: item.data[0].media_type,
      description: item.data[0].description
    })) : [];
    
    return {
      assets,
      meta: {
          total_items: response.data.collection.metadata.total_hits
      }
    }
    
  }
));

router.get('/:id', cacheMiddleware((req) => `archive_${req.params.id}`, async(req, res) => {
 
  const { id } = req.params;

  const asset$ = from(
    axios.get(`${NASA_IMAGE_BASE_URL}/asset/${id}`, {
      params: {
        api_key: process.env.NASA_API_KEY
      },
    })
  );

  const result$ = asset$.pipe(
    switchMap(assetRes =>
      from(axios.get(`${NASA_IMAGE_BASE_URL}/metadata/${id}`)).pipe(
        switchMap(metaRef =>
          from(axios.get(metaRef.data.location)).pipe(
            map(meta => {
              const mediaType = meta.data['AVAIL:MediaType'];
              return {
                asset: {
                  url: fetchUrl(assetRes.data.collection.items, mediaType),
                  title: meta.data['AVAIL:Title'] || '',
                  description: meta.data['XMP:Description'] || meta.data['AVAIL:Description'] ||null,
                  date_created: formatDate(meta.data['AVAIL:DateCreated']),
                  type: mediaType || 'unknown',
                },
                thumbnails: meta.data['AVAIL:Thumbnails'],
              };
            })
          )
        )
      )
    ),
    catchError(err => {
      console.error('Error in RxJS pipeline:', err.message);
      return of({
        error: 'Failed to fetch asset metadata'
      });
    })
  );


  return await lastValueFrom(result$);

}));

export default router;