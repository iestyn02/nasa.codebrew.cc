import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router';

import type { Route } from './+types/home';

import { TITLE, DESCRIPTION, API_URL } from '../constants';

import HeaderComponent from '../components/header';

export function meta({}: Route.MetaArgs) {
  return [
    { title: TITLE },
    { name: 'description', content: DESCRIPTION },
  ];
}

export interface SnapshotAPIResponse {
    earth: {
        imageUrl: string;
    };
    sky: {
        iframeUrl: string;
        moonPhase: 'New Moon' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous' | 'Full Moon' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent';
    }
}

export default function SnapshotResult() {
    const [ searchParams ] = useSearchParams();

    const [ earthImageUrl, setEarthImageUrl] = useState('');
    const [ moonPhase, setMoonPhase] = useState('');
    const [ starChartUrl, setStarChartUrl] = useState('');

    const fetchEarthSkyData = async (date: string, lat: string, lon: string) => {
        try {
            const params = new URLSearchParams({
                date,
                lat,
                lon
            });

            const response = await fetch(`${API_URL}/snapshot?${params.toString()}`);

            if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json() as SnapshotAPIResponse;

            setEarthImageUrl(data.earth.imageUrl);
            setMoonPhase(data.sky.moonPhase);
            setStarChartUrl(data.sky.iframeUrl);
            
            return data;

        } catch (error) {
            if (error instanceof Error) {
                console.error('Fetch failed:', error.message);
            } else {
                console.error('Unknown error', error);
            }       
        }
    };

    useEffect(() => {
        if (!searchParams.get('date') || !searchParams.get('lat')  || !searchParams.get('lon')) return;

        fetchEarthSkyData(
            searchParams.get('date') as string,
            searchParams.get('lat') as string,
            searchParams.get('lon') as string
        );
        
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
                                <span>
                                    The moon phase was <span className="text-gray-300 text-light">{ moonPhase }</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div> }
            </div>
        </main>
  );
};