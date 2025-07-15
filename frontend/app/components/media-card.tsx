import React from 'react';

import { Link } from 'react-router';

import type { AssetItem } from './images';

type MediaCardProps = {
  item: AssetItem;
};

const MediaCardComponent: React.FC<MediaCardProps> = ({ item }) => {
    return (
        <Link to={ '/images/' + item.id }>
            <div key={item.id}
                className="relative group bg-white/10 rounded-lg shadow overflow-hidden cursor-pointer flex flex-col">
                <div className="aspect-video relative">
                    <img src={ item.thumb } className="aspect-video w-full h-full object-cover" />
                    { item.type === 'video' && (
                    <div
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    )}
                    <span className={`absolute top-2 left-2 text-white text-xs px-2 py-0.5 rounded-full ${ item.type ==='image'
                        ? 'bg-blue-600' : 'bg-red-600' }`}>
                        { item.type.charAt(0).toUpperCase() + item.type.slice(1) }
                    </span>
                </div>
                <div className="p-3 text-left flex flex-col h-full">
                    <h3 className="text-sm font-semibold leading-tight line-clamp-2 mb-2 min-h-[35px]" >
                        { item.title }
                    </h3>
                    <p className="text-xs text-gray-500 mt-auto">{ new Date(item.date_created).toLocaleDateString() }</p>
                </div>
            </div>
        </Link>
    )
};

export default MediaCardComponent;