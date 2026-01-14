
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const menus = [
    { id: 'home', name: 'Trang Chủ' },
    { id: 'guides', name: 'Tài Liệu' },
    { id: 'roadmap', name: 'Lộ Trình' },
    { id: 'tools', name: 'Vũ Khí AI' },
    { id: 'deals', name: 'Săn Kèo' },
    { id: 'ai-advisor', name: 'Cố Vấn AI' },
    { id: 'share', name: 'Cống Hiến' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 liquid-glass px-4 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0 group" 
          onClick={() => setActiveTab('home')}
        >
          <div className="bg-gradient-to-br from-red-600 to-red-950 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(153,27,27,0.5)] group-hover:rotate-12 transition-all duration-500">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-[900] text-white hidden sm:block tracking-tighter italic">
            MMO <span className="shimmer-text blood-text-glow">LIQUID</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center bg-white/5 rounded-2xl p-1 border border-white/5">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.id)}
              className={`px-5 py-2 rounded-xl text-xs font-[800] uppercase tracking-wider transition-all duration-500 whitespace-nowrap ${
                activeTab === menu.id 
                  ? 'text-white bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                  : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              {menu.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white px-4">
            Cộng đồng
          </button>
          <button className="bg-red-700 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-xl glow-button shimmer-btn whitespace-nowrap">
            Gia nhập VIP
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
