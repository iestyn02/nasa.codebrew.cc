import React, { useContext } from 'react';

import { Link } from 'react-router';

import { AppContext } from '../state/context';

import Landing from './landing';

// const AppComponent: React.FC = ({ children }) => {

export function AppComponent({ children }: { children: React.ReactNode }) {

    const base = import.meta.env.VITE_BASE_PATH;
    
    const { state, dispatch } = useContext(AppContext);

    return (
        <div id="perspective" className={`perspective effect-moveleft ${state.menu ? 'animate modalview' : ''}`}>{/*  */}
        <div className={`containerXX ${state.menu ? 'transform' : '' }` }>
            {/* @note ~ Overlay to enable to return back to main page */}
            <div className="containerXX__close" onClick={() => dispatch({ type: 'SET_MENU', payload: false })}></div>
	
            <div className="wrapper" style={ { overflow: 'hidden', margin: 0 } }>
            {/* -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale; */}
                {/* { state.menu } */}
                {/* <LandingComponent /> */}
                {/* { children } */}

                {/* <svg className="hidden">
                    <defs>
                        <symbol id="icon-arrow" viewBox="0 0 24 24">
                            <title>arrow</title>
                            <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 "/>
                        </symbol>
                        <symbol id="icon-drop" viewBox="0 0 24 24">
                            <title>drop</title>
                            <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z"/><path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z"/>
                        </symbol>
                        <symbol id="icon-search" viewBox="0 0 24 24">
                            <title>search</title>
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </symbol>
                        <symbol id="icon-cross" viewBox="0 0 24 24">
                            <title>cross</title>
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </symbol>
                    </defs>
                </svg> */}
                <main className={`main-wrap ${state.landing ? 'main-wrap--move' : ''}`}>
                    { children }
                    {/* <ImagesComponent />
                    <header className="codrops-header">
                        <div className="codrops-links">
                        </div>
                        <h1 className="codrops-header__title">Inspiration for Search UI Effects</h1>
                        <div className="search-wrap">
                            <button id="btn-search" onClick={() => dispatch({ type: 'SET_LANDING', payload: true })} className="btn btn--search">Open Landing</button>
                        </div>
                    </header>
                    <div className="bottom-nav">
                        <nav className="codrops-demos">
                            <span>More demos: </span>
                            <a href="index.html">1</a>
                            <a href="index2.html">2</a>
                            <a href="index3.html">3</a>
                            <a href="index4.html">4</a>
                            <a className="current-demo" href="index5.html">5</a>
                            <a href="index6.html">6</a>
                            <a href="index7.html">7</a>
                            <a href="index8.html">8</a>
                            <a href="index9.html">9</a>
                            <a href="index10.html">10</a>
                            <a href="index11.html">11</a>
                        </nav>
                    </div> */}
                </main>
                <div className={`search ${state.landing ? 'search--open' : ''}`} >
                    <div className="relative h-screen text-white overflow-y-auto">
                        <Landing />
                    </div>

                    {/* <button id="btn-search-close" className="btn btn--search-close" aria-label="Close search form" onClick={() => dispatch({ type: 'SET_LANDING', payload: false })}><svg className="icon icon--cross"><use xlinkHref="#icon-cross"></use></svg></button>
                    <form className="search__form" action="">
                        <input className="search__input w-full bg-white/80 text-black placeholder:font-italitc font-light rounded-full py-2 pl-10 pr-4 focus:outline-none" name="search" type="search" placeholder="Enter your keyword to search" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                        <span className="search__info text-s font-normal" onClick={() => dispatch({ type: 'SET_MENU', payload: true })}>Search NASA archives</span>
                    </form>
                    <div className="search__related">
                        <div className="search__suggestion">
                            <h3>May We Suggest?</h3>
                            <p>#drone #funny #catgif #broken #lost #hilarious #good #red #blue #nono #why #yes #yesyes #aliens #green</p>
                        </div>
                        <div className="search__suggestion">
                            <h3>Needle, Where Art Thou?</h3>
                            <p>#broken #lost #good #red #funny #lala #hilarious #catgif #blue #nono #why #yes #yesyes #aliens #green #drone</p>
                        </div>
                    </div> */}
                    {/* <div className="search__xx">
                        <LandingComponent />
                    </div> */}
                </div>

                {/* <div className="codrops-top clearfix">
                    <a className="codrops-icon codrops-icon-prev"
                        href="http://tympanus.net/Development/ProgressButtonStyles/"><span>Previous Demo</span></a>
                    <span className="right"><a className="codrops-icon codrops-icon-drop"
                            href="http://tympanus.net/codrops/?p=17915"><span>Back to the Codrops Article</span></a></span>
                </div>
                <header className="codrops-header">
                    <h1>Perspective Page View Navigation <span>Transforms the page in 3D to reveal a menu</span></h1>
                </header>
                <div className="main clearfix">
                    <div className="column">
                        <p><button id="showMenu">Show Menu</button></p>
                        <p>Click on this button to see the content being pushed away in 3D to reveal a navigation or other
                            items.</p>
                    </div>
                    <div className="column">
                        <nav className="codrops-demos">
                            <a href="index.html">Airbnb Effect</a>
                            <a href="index2.html" className="current-demo">Move Left</a>
                            <a href="index3.html">Rotate Left</a>
                            <a href="index4.html">Move Down</a>
                            <a href="index5.html">Rotate Top</a>
                            <a href="index6.html">Lay Down</a>
                        </nav>
                    </div>
                    <div className="related">
                        <p>If you enjoyed this demo you might also like:</p>
                        <p><a href="http://tympanus.net/Tutorials/AnimatedBorderMenus/">Animated Border Menus</a></p>
                        <p><a href="http://tympanus.net/Development/SidebarTransitions/">Transitions for Off-Canvas
                                Navigations</a></p>
                    </div>
                </div> */}
            </div>
        </div>
        <nav className="outer-nav right vertical">
            <Link to="">Home</Link>
            <Link to="apod">APOD</Link>
            <Link to="snapshot">Earth & Sky Snapshot</Link>
            <Link to="moon">Moon Buggy</Link>
            <Link to="images">Images & Videos</Link>
        </nav>
      </div>
    )
};

export default AppComponent;