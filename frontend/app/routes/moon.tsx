import { useContext, useEffect } from 'react';

import type { Route } from './+types/home';

import { AppContext } from '../state/context';

import HeaderComponent from '../components/header';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Moon() {

  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SET_LANDING', payload: false });
    dispatch({ type: 'SET_MENU', payload: false });
  }, [dispatch]);
  
  return (
    <main className="relative h-screen text-white overflow-y-auto">
      <div className="relative z-10 px-6 py-8">
        <HeaderComponent />
        <div className="text-center mt-16">
          <h1 className="text-white text-4xl md:text-6xl font-thin mb-8">
            Coming Soon!
          </h1>
          <div className="max-w-md mx-auto mt-4">
            <p className="max-w-2xl mx-auto text-lg font-thin">
              This feature combines the power of Google Maps and NASA’s APIs to bring you a fully interactive, high-resolution lunar experience. Zoom, pan, and discover real moon data rendered with seamless detail — all in your browser.

              Track landing sites, explore craters, or just drift across the surface of the moon in real time. It's astronomy, cartography, and sci-fi vibes — all rolled into one.

              Coming soon. Stay tuned.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};