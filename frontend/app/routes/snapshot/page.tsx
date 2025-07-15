import "react-datepicker/dist/react-datepicker.css";

import { useCallback, useContext, useEffect, useState } from 'react';

import { Link } from "react-router";

import DatePicker from 'react-datepicker';

import AsyncSelect from 'react-select/async';

import debounce from 'lodash.debounce';

import type { Route } from '../+types/home';

import { AppContext } from '../../state/context';

import HeaderComponent from '../../components/header';

export interface LocationOption {
  value: string;
  label: string;
  geometry: { type: 'Point', coordinates: number[]};
}

export interface LocationFeature {
  type: 'Feature';
  properties: {
    country: string;
    country_code: 'ru' | string;
    region: string;
    state: string;
    city: string;
    iso3166_2: string;
    lon: number;
    lat: number;
    result_type: 'city' | string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    category: string;
    timezone: {
      name: string;
      offset_STD: string;
      offset_STD_seconds: number;
      offset_DST: string;
      offset_DST_seconds: number;
      abbreviation_STD: string;
      abbreviation_DST: string;
    };
    plus_code: string;
    plus_code_short: string;
    rank: string;
    place_id: string;
  };
  geometry: { type: 'Point', coordinates: number[]};
  bbox: number[];
}

export interface LocationResponse {
  type: 'FeatureCollection';
  features: LocationFeature[]; 
  query: { 
    text: string;
    parsed: { city: string; expected_type: 'unknown' }
  } 
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Where were you when?' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export const parseDate = (date: Date): string => {
  return date ? date.toISOString().split('T')[0] : '';
};

const fetchLocations = async (query: string) => {
  const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=16b327cb8cd64ca19a688553da6a6630`);
  const data = await res.json();

  return data.features.map((location: LocationFeature) => ({
    label: location.properties.formatted,
    value: location.properties.place_id,
    geometry: location.geometry
  }));
};

export default function Snapshot() {
  const base = import.meta.env.VITE_BASE_PATH;

  const _ = new Date();
  const DEFAULT_DATE = new Date(_);

  DEFAULT_DATE.setFullYear(DEFAULT_DATE.getFullYear() - 2); 

  const { dispatch } = useContext(AppContext);

  const [date, setDate] = useState(DEFAULT_DATE);
  const [ location, setLocation ] = useState<number[]>([]);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (date && location[0] && location[1]) {
      /** @note ~ handle */
    } else {
      alert('Please fill in required fields');
    }
  };

  const setSelectedLocation = ($e: LocationOption) => {

    if($e) {
      setLocation($e.geometry.coordinates);
    } else {
      setLocation([]);
    }
  };

  const loadOptions = useCallback(
    debounce((inputValue, callback) => {
      fetchLocations(inputValue).then((results) => {
        callback(results);
      });
    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      loadOptions.cancel();
    };
  }, [loadOptions]);

  useEffect(() => {
    dispatch({ type: 'SET_LANDING', payload: false });
    dispatch({ type: 'SET_MENU', payload: false });
  }, [dispatch]);

  return (
    <main className="relative h-screen text-white overflow-y-auto">
      <div className="relative z-10 px-6 py-8"> {/* bg-opacity-50 */}
        <HeaderComponent />
        <div className="text-center mt-16">
          <div className="p-4 max-w-md mx-auto rounded-2xl shadow-lg space-y-4">
            <h1 className="text-white text-4xl md:text-6xl font-thin mb-8">
              Where Were You When?
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-left">
                <label htmlFor="firstName" className="block text-sm font-medium text-white/30 mb-1">
                  Date
                </label>
                <DatePicker
                  className="w-full bg-white/10 placeholder:font-italitc font-light rounded-full py-2 pl-10 pr-4 focus:outline-none"
                  selected={date}
                  onChange={(test: any) => setDate(test)}
                  placeholderText="Enter your date"
                />
              </div>

              <div className="text-left">
                <label htmlFor="email" className="block text-sm font-medium text-white/30 mb-1">
                  Location
                </label>
                <div className="text-black">
                  <AsyncSelect 
                    cacheOptions
                    loadOptions={loadOptions}
                    placeholder="Search Locations..."
                    isClearable
                    onChange={(option) => setSelectedLocation(option as LocationOption)}
                  />
                </div>

                {/* <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full bg-white/10 placeholder:font-italitc font-light rounded-full py-2 pl-10 pr-4 focus:outline-none"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                /> */}
              </div>

              <div className="mt-8">
                { (date && location[0] && location[1]) ? 
                  <Link
                    className="block w-full cursor-pointer bg-white/90 text-black py-2 px-4 rounded-4xl hover:bg-white transition"
                    to={`/snapshot/fetch?date=${parseDate(date)}&lon=${location[0]}&lat=${location[1]}`}
                  >
                    Submit
                  </Link> :

                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-white/90 text-black py-2 px-4 rounded-4xl hover:bg-white transition"
                  >
                    Submit
                  </button>
                }
              </div>
      
              {/* <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter a city or coordinates"
                className="w-full bg-white/10 placeholder:font-italitc font-light rounded-full py-2 pl-10 pr-4 focus:outline-none"
                required
              />
              <button type="submit" className="w-full bg-white text-black py-2 rounded hover:bg-indigo-700">
                Generate Snapshot
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};