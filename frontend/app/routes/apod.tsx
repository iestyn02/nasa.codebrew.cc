import { useContext, useEffect, useState } from 'react';

import type { Route } from './+types/home';

import { AppContext } from '../state/context';

import HeaderComponent from '../components/header';

export interface APODResponse {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: 'v1';
  title: string;
  url: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Apod() {
  
  const { state, dispatch } = useContext(AppContext);

  const [ data, setData ] = useState<APODResponse>();

  const fetchApod = async () => {
    try {
      const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        if (!res.ok) throw new Error('Failed to fetch APOD');
        const json = await res.json();
        console.warn(json);
        setData(json);
      } catch (err: any) {
        /** @note ~ handle `setError(err.message || 'Unknown error')`*/
      }
  };

  useEffect(() => {
    dispatch({ type: 'SET_LANDING', payload: false });
    dispatch({ type: 'SET_MENU', payload: false });
  }, [dispatch]);

  useEffect(() => {
    fetchApod();
  }, []);

  return (
    <main className="relative h-screen text-white overflow-y-auto">
      <div className="relative z-10 px-6 py-8">
        <HeaderComponent />
        <div className="max-w-4xl mx-auto text-center mt-16">
          <h1 className="text-white text-4xl mx-auto md:text-6xl font-thin mb-8">
            Astronomy Picture of the Day
          </h1>
          { data && data.url && 
            <div className="w-full h-auto bg-white/10 rounded-2xl shadow-lg overflow-hidden">
              <img
                src={data.url}
                alt="Card image" 
                className="w-full h-250 object-cover"
              />

              <div className="p-6 text-left">
                <h2 className="text-4xl font-light mb-1">{ data.title }</h2>
                <p className="text-sm font-normal text-gray-500 mb-3">{ new Date(data.date).toLocaleDateString() }</p>
                <p className="text-white/50 font-light">
                  { data.explanation }
                </p>
              </div>
            </div>
          }
          {/* <div className="max-w-md mx-auto mt-4">
            { data && data &&
              <p className="max-w-2xl mx-auto text-lg font-thin">
                <img src={data.url} />
              </p>
            }
          </div> */}
        </div>
      </div>
    </main>
  );
};