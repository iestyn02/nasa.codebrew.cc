import { useEffect, useState, type FormEvent } from 'react';

import { useSearchParams, useNavigate } from 'react-router';

import MediaCardComponent from './media-card';

export interface ImagesResponse { 
    collection: { 
        href: string;
        items: any[];
        // items: [ {href: "https://images-assets.nasa.gov/video/ObserveTheMoon_16x9/collection.json",…}, {,…},…]
        // links: [{rel: "next", prompt: "Next",…}]
        metadata:  {
            total_hits: 556
        };
        version: string | '1.1';
    } 
}

const base = import.meta.env.VITE_BASE_PATH;

export function ImagesComponent() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState('');

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // @note ~ pagination
    const ITEMS_PER_PAGE = 12
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalItems, setTotalItems ] = useState(0);

    const handleSubmit = ($e: FormEvent<HTMLFormElement>): void => {
        $e.preventDefault();
        setCurrentPage(1);
        fetchData(query, 1);
    };

    const fetchData = async (query: string, page: number = 1) => {

        if(query) {
            setLoading(true);

            navigate({
                pathname: `/images`,
                search: `?query=${query}&page=${page}`
            });
     
            const res = await fetch(`https://images-api.nasa.gov/search?q=${query}&page=${page}&page_size=${ITEMS_PER_PAGE}`);
            const data: ImagesResponse = await res.json();
            setResults(data.collection.items);
            setTotalItems(data.collection.metadata.total_hits);
        }
      
        setLoading(false);
    };

    const totalPages = (total: number): number => {
        return Math.ceil(total / ITEMS_PER_PAGE)
    };

    const getPaginationRange = (currentPage: number, totalPages: number): (number | string)[] => {
        const delta = 2;
        const range: (number | string)[] = [];
        const left = Math.max(2, Number(currentPage) - delta);
        const right = Math.min(totalPages - 1, Number(currentPage) + delta);

        range.push(1);

        if (left > 2) {
            range.push('...');
        }

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < totalPages - 1) {
            range.push('...');
        }

        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    };

    useEffect(() => {
        const query = searchParams.get('query');

        const page = Number(searchParams.get('page') || 1);


        if(!query) { setLoading(false); return; }
        
        fetchData(query, page);
        setCurrentPage(page);
        setQuery(query);
    }, []);

    return (
         <div className="relative z-10 px-6 py-8">
            <div className="max-w-xl mx-auto mb-8">
                <form onSubmit={handleSubmit} noValidate>
                    <label className="relative block">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                                height="30" viewBox="0 0 30 30">
                                <path
                                    d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                                </path>
                            </svg>
                        </span>
                        <input
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                            className="w-full bg-white/10 placeholder:font-italitc font-light rounded-full py-2 pl-10 pr-4 focus:outline-none"
                            placeholder="Enter your keyword to search images & videos" type="text" />
                    </label>
                </form>
            </div>
            <div className="max-w-5xl mx-auto">
                { loading ? 
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="animate-pulse relative group bg-white/10 rounded-lg shadow overflow-hidden cursor-pointer flex flex-col">
                                <div className="aspect-video relative">
                                    <div className="h-40 bg-gray-300/20 rounded-md" />
                                </div>
                                <div className="p-3 text-left flex flex-col h-full">
                                    <div className="h-3 bg-gray-300/50 rounded w-3/4 mb-3" />
                                    <div className="h-2 bg-gray-300/50 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div> :
                    results && results.length ?
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4">
                        { results.map((item, index) => (
                            <MediaCardComponent key={ index } item={ item } />
                        ))}
                    </div> :
                    <div className="mt-32">
                        <h2 className="text-4xl font-light mb-4">
                            { searchParams.get('query') ? 'No Results' : 'Search NASA Archives'}
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg font-thin">
                            { searchParams.get('query') ? 'Modify your search query and try again.' :
                                'Start by typing a keyword into the search bar.'
                            }
                        </p>
                    </div>
                }

                { !loading && results && results.length ? 
                
                <div className="flex justify-between items-center mt-6 px-6">
                    {/* Prev button (left) */}
                    <button
                        onClick={() => { setCurrentPage(Number(currentPage)  - 1); fetchData(query, Number(currentPage ) - 1)} }
                        className="flex items-center justify-center cursor-pointer px-4 py-2 bg-transparent rounded disabled:opacity-50"
                        disabled={currentPage === 1}
                    >
                        <i className="icon-arrow_backward_2"></i> Prev
                    </button>

                    <div className="flex gap-2">
                        { getPaginationRange(currentPage, totalPages(totalItems)).map((page, index) => {
                            if (page === '...') {
                                return (
                                    <span key={index} className="px-3 py-1 text-white opacity-60">
                                    ...
                                    </span>
                                );
                            }

                            return (
                            <button
                                key={index}
                                onClick={() => { setCurrentPage(Number(page)); fetchData(query, Number(page))} }
                                className={`cursor-pointer px-3 py-1 rounded-full ${
                                currentPage === page ? 'bg-white/20 text-white' : 'text-white'
                                }`}
                            >
                                {page}
                            </button>
                            );
                        })}
                    </div>

                    {/* Next button (right) */}
                    <button
                        onClick={() => { setCurrentPage(Number(currentPage)  + 1); fetchData(query, Number(currentPage ) + 1)} }
                        // onClick={() => { fetchData(query, currentPage + 1 )} }
                        className="flex items-center justify-center cursor-pointer px-4 py-2 bg-transparent rounded disabled:opacity-50"
                        disabled={currentPage === totalPages(totalItems)}
                    >
                        Next <i className="icon-arrow_forward_2"></i>
                    </button>
                </div> : <div></div>
                }
            </div>
         </div>
    );
};