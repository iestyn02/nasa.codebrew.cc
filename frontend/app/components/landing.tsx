import React, { useContext, useState, type ChangeEvent, type FormEvent } from 'react';

import { Link, useNavigate } from 'react-router';

import { AppContext } from '../state/context';

const base = import.meta.env.VITE_BASE_PATH;

const LandingComponent: React.FC = () => {

    const navigate = useNavigate();

    const { state, dispatch } = useContext(AppContext);

    const [query, setQuery] = useState('');

    const handleSubmit = ($e: FormEvent<HTMLFormElement>): void => {
        $e.preventDefault();

        navigate({
            pathname: `images`,
            search: `?query=${query}`,
        });
    };

    return (
        <div className="relative z-10 px-6 py-8"> {/* bg-opacity-50 */}
            <header className="flex justify-between items-center py-4">
                <div className="text-xl font-bold">
                    { state && state.landing ? <span className="logo" style={{  backgroundImage: 'url(logo.svg)' }}></span> : <span></span> }
                </div>
                <nav className="space-x-6 hidden md:flex xyz">
                    <a href="javascript:;" className="text-3xl" onClick={() => dispatch({ type: 'SET_MENU', payload: true })}>
                        <i className="icon-menu"></i>
                    </a>
                </nav>
            </header>
            <div className="text-center mt-32">
                <h1 className="search__header text-white text-4xl md:text-6xl font-thin mb-8">Welcome home, Earthling</h1>
                <div className="max-w-md mx-auto mt-4">
                {/* <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded bg-white text-black"
                /> */}

                    {/* <div>
                        <button onClick={() => dispatch({ type: 'SET_MENU', payload: true })}>
                            Open Menu
                        </button>
                    </div> */}
                    <form onSubmit={handleSubmit} noValidate>
                        <label className="relative block">
                            <span className="xyz absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                                    height="30" viewBox="0 0 30 30">
                                    <path
                                        d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                                    </path>
                                </svg>
                            </span>
                            <input
                                onChange={(e) => setQuery(e.target.value)}
                                className="search__input w-full bg-white/10 placeholder:font-italitc font-light rounded-full py-2 pl-10 pr-4 focus:outline-none"
                                placeholder="Enter your keyword to search images & videos" type="text" />
                        </label>
                    </form>

                    {/* <div className="mt-8 text-sm">
                        <button className="bg-white text-black px-6 py-2 rounded-full flex items-center justify-center mx-auto" onClick={() => dispatch({ type: 'SET_LANDING', payload: false })}>
                        <span className="mr-2">▶</span> Expedition 51 Launch – June 4, 2020
                        </button>
                    </div> */}

                    <section className="mt-24 xyz22">
                        <h2 className="text-2xl font-light mb-4">Explore Space with NASA’s Images, Videos, and Data</h2>
                        <p className="max-w-2xl mx-auto text-lg font-thin">
                            Unlock NASA’s treasure trove of images and videos, from breathtaking nebulae to iconic mission footage. Then dive deeper: visualize planets, track satellites, and see the stars as they appeared on your birthday. Powered entirely by NASA’s official APIs, this is your portal to space, built for curiosity.
                        </p>
                    </section>
                </div>

                <div className="max-w-4xl mx-auto mt-4 xyz22">
                    <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 text-left">
                        <div className="bg-white/5 text-white p-4 rounded shadow flex flex-col h-full">
                            <h3 className="mb-4 text-lg font-bold mt-2">Navigate the Moon</h3>
                            {/* <img src="/test1.jpg" alt="" className="w-full object-cover rounded" /> */}
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> */}
                            <p className="max-w-2xl mx-auto text-sm font-light mb-4">
                                Take a virtual journey across the lunar surface with interactive moon maps powered by Google Maps and real-time data from NASA’s API. Click below to navigate craters, landmarks, and mission sites like never before.
                            </p>
                            
                            <Link to={`/moon`} className="mt-auto inline-flex items-center text-blue-600 group">
                                Explore the Moon!
                                <span className="ml-1 transition-transform group-hover:translate-x-1">
                                    <i className="icon-arrow_forward"></i>
                                </span>
                            </Link>
                        </div>
                        <div className="bg-white/5 text-white p-4 rounded shadow flex flex-col h-full">
                            <h3 className="mb-4 text-lg font-bold mt-2">Where were you at?</h3>
                            {/* <img src="/test1.jpg" alt="" className="w-full object-cover rounded" /> */}
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> */}
                            <p className="max-w-2xl mx-auto text-sm font-light">
                                Pick a date, your birth, a historic milestone, and see the Earth and stars from space as they were.
                            </p>
                            <Link to={`/snapshot`} className="mt-auto inline-flex items-center text-blue-600 group">
                                Show me the stars
                                <span className="ml-1 transition-transform group-hover:translate-x-1">
                                    <i className="icon-arrow_forward"></i>
                                </span>
                            </Link>
                        </div>

                        <div className="bg-white/5 text-white p-4 rounded shadow flex flex-col h-full">
                            <h3 className="mb-4 text-lg font-bold mt-2">
                                Astronomy Picture of the Day.
                            </h3>
                            <p className="max-w-2xl mx-auto text-sm font-light">
                                NASA’s daily image or video featuring celestial wonders, space missions, and cosmic phenomena — explained by astronomers.
                            </p>
                            <Link to={`/apod`} className="mt-auto inline-flex items-center text-blue-600 group">
                                View Picture of the Day
                                <span className="ml-1 transition-transform group-hover:translate-x-1">
                                    <i className="icon-arrow_forward"></i>
                                </span>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
};

export default LandingComponent;