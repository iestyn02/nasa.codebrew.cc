import "react-datepicker/dist/react-datepicker.css";

import { useCallback, useContext, useEffect, useMemo, useRef, useState, type FormEventHandler } from 'react';

import DatePicker from 'react-datepicker';

import AsyncSelect from 'react-select/async';

import debounce from 'lodash.debounce';

import type { Route } from './+types/home';

import { AppContext } from '../state/context';

import HeaderComponent from '../components/header';
import { useSearchParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Heyyyyyyyyy' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

type Layer = 'MODIS_Terra_CorrectedReflectance_TrueColor' | 'VIIRS_Black_Marble' | 'MODIS_Terra_Thermal_Anomalies_All' | 'VIIRS_Night_Lights';

function latLonToTile(lat: number, lon: number, zoom: number): { x: number, y: number } {
    const tiles = Math.pow(2, zoom);
    const x = Math.floor((lon + 180) / 360 * tiles);
    const y = Math.floor((90 - lat) / 180 * tiles);
    return { x, y };
  }

export default function SnapshotResult() {

    const NASA_API_KEY = 'JKpHvyfT6obNdc3zWahhqNJg8M9fRcOzywMXwLiq';
    const [ searchParams ] = useSearchParams();

    const [ earthImageUrl, setEarthImageUrl] = useState('');
    const [ moonPhase, setMoonPhase] = useState('');
    const [ starChartUrl, setStarChartUrl] = useState('');

    useEffect(() => {
        if (!searchParams.get('date') || !searchParams.get('lat')  || !searchParams.get('lon')) return;
       
        // const { lat, lon } = locationCoords;
        // 1. Fetch Earth image
        const fetchEarthImage = async () => {
            const dim = 0.15; // degrees of image size
            const zoom = 2;
            const layer: Layer = 'MODIS_Terra_CorrectedReflectance_TrueColor';

            const { x, y } = latLonToTile(Number(searchParams.get('lat')), Number(searchParams.get('lon')), zoom);

            const url = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/${layer}/default/${searchParams.get('date')}/250m/${zoom}/${y}/${x}`;
            setEarthImageUrl(url);

            const res = await fetch(
                // `https://api.nasa.gov/planetary/earth/assets?lon=${searchParams.get('lon')}&lat=${searchParams.get('lat')}&date=${searchParams.get('date')}&dim=${dim}&api_key=${NASA_API_KEY}`
                `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/${layer}/default/${searchParams.get('date')}/500m/${zoom}/${y}/${x}`
                // https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2023-07-09/250m/4/2/6.jpg
            );
            const data = await res.json();
            if (data.url) setEarthImageUrl(data.url);
        };

        /** @note ~ Set iframe url for sky snapshot */
        // 2. Simulate Moon phase (simplified, based on date string)
        const getMoonPhase = (da: string) => {
            const d = new Date(da);
            const moonCycle = 29.53; // days
            const knownNewMoon = new Date("2000-01-06T18:14:00Z"); // base ref
            const daysSince = (d.getUTCSeconds() - knownNewMoon.getUTCSeconds()) / (1000 * 60 * 60 * 24);
            const phase = daysSince % moonCycle;

            if (phase < 1) return "New Moon";
            if (phase < 7) return "Waxing Crescent";
            if (phase < 8) return "First Quarter";
            if (phase < 14) return "Waxing Gibbous";
            if (phase < 15) return "Full Moon";
            if (phase < 22) return "Waning Gibbous";
            if (phase < 23) return "Last Quarter";
            return "Waning Crescent";
        };

        /** @note ~ Set iframe url for sky snapshot */
        const generateStarChart = () => {
            setStarChartUrl(`https://virtualsky.lco.global/embed/index.html?longitude=${searchParams.get('lon')}&latitude=${searchParams.get('lat')}&constellations=true&gridlines_az=true&live=false&clock=false&projection=stereo&showposition=true&cardinalpoints=true&ecliptic=true&clock=${searchParams.get('date')}T00:00:00`);
        };

        fetchEarthImage();
        setMoonPhase(getMoonPhase(searchParams.get('date') as string));
        generateStarChart();
    }, [searchParams.get('date'), searchParams.get('lat'), searchParams.get('lon')]);
    

    return (
        <main className="relative h-screen text-white overflow-y-auto">
            <div className="relative z-10 px-6 py-8"> {/* bg-opacity-50 */}
                <HeaderComponent />
                { earthImageUrl && <div className="flex flex-wrap justify-center gap-6 p-6">
                    <div className="w-full md:w-[45%] bg-white/10 rounded-md shadow-lg">
                        <div 
                            style={ { backgroundImage: `url(${earthImageUrl})` } } 
                            className="snapshot-bg w-full w-full h-100 rounded-md "
                        >
                        </div>
                        <div className="p-6">
                        <h2 className="text-2xl font-thin mb-2">Earth Snapshot</h2>
                        <p className="text-gray-500 text-sm">
                            A satellite view of Earth as it appeared on <span className="text-gray-300">{ new Date(searchParams.get('date') as string).toLocaleDateString() }</span>, 
                            approximately near coordinates <span className="text-gray-300 text-sm">{ searchParams.get('lat') }, { searchParams.get('lon') }</span>
                        </p>
                        </div>
                    </div>

                    <div className="w-full md:w-[45%] bg-white/10 rounded-md shadow-lg overflow-hidden">
                        <div className="w-full h-100 object-cover">
                            <iframe
                                title="Star Chart"
                                src={starChartUrl}
                                width="100%"
                                height="100%"
                                style={{ border: "none", borderRadius: "12px" }}
                            />
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-thin mb-2">Sky Snapshot</h2>
                            <p className="text-gray-500 text-sm">
                                A snapshot of the sky as it appeared on <span className="text-gray-300">{ new Date(searchParams.get('date') as string).toLocaleDateString() }</span>, 
                                approximately near coordinates <span className="text-gray-300 text-sm">{ searchParams.get('lat') }, { searchParams.get('lon') }</span>.

                                <br></br>
                                <br></br>
                                <p>
                                    The moon phase was <span className="text-gray-300 text-light">{ moonPhase }</span>
                                </p>
                            </p>
                        </div>
                    </div>
                </div> }
            </div>
        </main>
  );
};