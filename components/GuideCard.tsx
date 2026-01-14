
import React from 'react';
import { Guide } from '../types';

interface GuideCardProps {
  guide: Guide;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  return (
    <div className="group flex flex-col glass-card rounded-2xl overflow-hidden h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={guide.imageUrl} 
          alt={guide.title}
          className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 opacity-70 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-red-900 text-white rounded-md shadow-lg">
            {guide.category}
          </span>
        </div>
      </div>
      
      <div className="p-7 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 mb-4 uppercase tracking-wider">
          <span className="text-red-600">{guide.author}</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
          <span>{guide.date}</span>
        </div>
        
        <h3 className="text-xl font-extrabold text-white mb-4 line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">
          {guide.title}
        </h3>
        
        <p className="text-zinc-500 text-sm line-clamp-3 mb-8 flex-grow leading-relaxed font-medium">
          {guide.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-800/50">
          <span className="text-[10px] font-black text-zinc-500 flex items-center gap-1.5 uppercase tracking-widest">
            <svg className="w-3.5 h-3.5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {guide.readTime}
          </span>
          <button className="text-red-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
            CHI TIẾT
            <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
