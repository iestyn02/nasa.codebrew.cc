import { useContext, useEffect } from 'react';

import type { Route } from './+types/home';

import { AppContext } from '../state/context';

import HeaderComponent from '../components/header';

import { TITLE, DESCRIPTION } from '../constants';

export function meta({}: Route.MetaArgs) {
  return [
    { title: TITLE },
    { name: 'description', content: DESCRIPTION },
  ];
}

export default function Home() {

  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SET_LANDING', payload: true });
    dispatch({ type: 'SET_MENU', payload: false });
  }, [dispatch]);
  
  return (
    <main className="relative h-screen text-white overflow-y-auto">
    <div className="relative z-10 px-6 py-8"> {/* bg-opacity-50 */}
      <HeaderComponent />
      <main className="text-center mt-16">
        {/* This markup is just a placeholder as it will be overridden by the `landing` component */}
      </main>
      </div>
    </main>
  );
};