
import React from 'react';
import { Guide } from '../types';

interface GuideCardProps {
  guide: Guide;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  return (
    <div className="group flex flex-col bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={guide.imageUrl} 
          alt={guide.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-bold bg-black/80 backdrop-blur rounded-full text-red-500 border border-red-900/50 shadow-sm">
            {guide.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3 font-medium">
          <span className="text-zinc-300">{guide.author}</span>
          <span>•</span>
          <span>{guide.date}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-500 transition">
          {guide.title}
        </h3>
        <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {guide.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs font-medium text-zinc-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {guide.readTime}
          </span>
          <button className="text-red-500 font-bold text-sm flex items-center gap-1 group/btn">
            Đọc ngay
            <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
