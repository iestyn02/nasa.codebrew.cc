import { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router';

import type { Route } from '../+types/home';

import { AppContext } from '../../state/context';

import HeaderComponent from '../../components/header';

export interface AssetResponse { 
    collection: { 
        href: string;
        items: { href: string }[];
        version: string | '1.1' | '1.0';
    } 
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function ImagePage() {
    const { id } = useParams();

    const { state, dispatch } = useContext(AppContext);
    const [ assets, setAssets ] = useState<any[]>([]);
    const [ metaData, setMetaData ] = useState<any>(null);

    useEffect(() => {
        dispatch({ type: 'SET_LANDING', payload: false });
        dispatch({ type: 'SET_MENU', payload: false });
    }, [dispatch]);

    const fetchData = async (query: string, page: number = 1) => {
        const res = await fetch(`https://images-api.nasa.gov/asset/${id}`);
        const data: any = await res.json();
        setAssets(data.collection.items);

        const _ = await fetch(`https://images-api.nasa.gov/metadata/${id}`);
        const link: any = await _.json();

        const final = await fetch(link.location);
        const _meta: any = await final.json();

        setMetaData(_meta);
    };

    const parseDate = (d: string): string => {
        const normalized = d.replace(':', '-');
        const formattedString = normalized.replace(':', '-');
        const date = new Date(formattedString);

        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });;
    }

    const stripTif = (url: string): string => {
        return url.replace(/~orig\.tif$/, '.jpg');
    }
  
    useEffect(() => {
        if (!id) return;
        fetchData(id);
    }, [id]);

    return (
        <div className="relative h-screen text-white overflow-y-auto">
            { metaData && <div className="relative z-10 px-6 py-8">
                <HeaderComponent />
                <div className="min-h-screen bg-black-50 p-4">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            { assets && assets.length && 
                                <div className={`bg-black rounded-lg overflow-hidden ${metaData['AVAIL:MediaType'] === 'image' ? 'aspect-image' : 'aspect-video'}` }>
                                    {/* <!-- Replace with <iframe> or <video> tag --> */}
                                    {/* <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe> */}

                                        { metaData['AVAIL:MediaType'] === 'image' ?
                                        <img src={ stripTif(assets[1].href) } /> :
                                        <video
                                            controls
                                            // poster={poster}
                                            className="w-full h-auto bg-black"
                                        >
                                            <source src={ assets[0].href } type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        }
                                </div>
                            }

                            {/* <!-- Video Title --> */}
                            <h1 className="mt-4 text-xl font-semibold mb-8">
                                { metaData['AVAIL:Title'] }
                            </h1>

                            {/* <!-- Channel Info + Actions --> */}
                            <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-400 rounded-full">
                                    <img className="rounded-full" src="https://yt3.googleusercontent.com/eIf5fNPcIcj9ig-wZBeq4stFy1lgjWTW1nLT5dYlFkHZprZ03QBiMcbpwNMB6XSBjrSFGtAGQg=s160-c-k-c0x00ffffff-no-rj" />
                                </div>
                                <div>
                                    <p className="font-medium">NASA Archives</p>
                                    <p className="text-sm text-gray-500">1.5M subscribers</p>
                                </div>
                                <button className="cursor-pointer ml-4 bg-red-600 text-sm px-4 py-1 rounded hover:bg-red-500">
                                    Subscribe
                                </button>
                                </div>
                                <div className="flex gap-2">
                                <button className="bg-gray-700 text-sm px-3 py-1 cursor-pointer rounded hover:bg-gray-600">Share</button>
                                <button className="bg-gray-700 text-sm px-3 py-1 cursor-pointer rounded hover:bg-gray-600">Save</button>
                                </div>
                            </div>

                            {/* <!-- Video Description --> */}
                            <div className="mt-4 bg-white/10 rounded p-4 shadow text-sm text-gray-200">
                                <p>
                                1.2M views • { parseDate(metaData['AVAIL:DateCreated']) }
                                <br />
                                <br />
                                { metaData['XMP:Description'] || 'No Description' }
                                {/* This is an example description. Add your video summary, links, timestamps, and more here. */}
                                </p>
                            </div>
                        </div>

                        {/* <!-- Recommended Videos --> */}
                        <div className="w-full lg:w-80 space-y-4">
                            { assets.map((_, i) => (
                                <div className="flex gap-3 bg-black" key={i}>
                                    <div className="w-40 aspect-video bg-white rounded">
                                        <img src={_.href} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium leading-snug">Recommended Video Title {i + 1}</p>
                                        <p className="text-xs text-gray-500">Channel · 100K views</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div> }
        </div>
    );
}