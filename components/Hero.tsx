
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 mb-10 text-[10px] font-black tracking-[0.3em] text-red-500 uppercase liquid-glass-red rounded-full border border-red-900/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,1)]"></span>
          </span>
          System Online: 50K Active Nodes
        </div>
        
        <h1 className="text-7xl md:text-9xl font-[950] text-white mb-10 leading-[0.85] tracking-tighter">
          ĐẾ CHẾ <br />
          <span className="shimmer-text blood-text-glow italic">
            MMO LỎNG
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-zinc-400 mb-14 leading-relaxed font-semibold italic">
          "Trong thế giới Digital, kẻ linh hoạt như chất lỏng mới có thể chảy vào những ngách hẹp nhất của dòng tiền."
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <button className="w-full sm:w-auto px-12 py-5 bg-red-800 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-red-700 transition glow-button shimmer-btn text-xs">
            Bẻ khóa lộ trình
          </button>
          <button className="w-full sm:w-auto px-12 py-5 liquid-glass text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-zinc-800 transition border border-white/10 text-xs">
            Hỏi ý kiến AI
          </button>
        </div>
        
        <div className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/5 pt-16">
          {[
            { label: 'AGENT AI', val: '24/7' },
            { label: 'NGÁCH HOT', val: '120+' },
            { label: 'LỢI NHUẬN', val: '∞' },
            { label: 'U TRÌNH', val: 'PRO' },
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl font-[900] text-white mb-2 group-hover:text-red-600 transition-colors duration-500">{s.val}</div>
              <div className="text-[9px] font-bold text-zinc-500 tracking-[0.4em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
