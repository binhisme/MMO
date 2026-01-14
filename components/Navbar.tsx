
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const menus = [
    { id: 'home', name: 'Trang Chủ' },
    { id: 'guides', name: 'Hướng Dẫn' },
    { id: 'roadmap', name: 'Lộ Trình' },
    { id: 'tools', name: 'Công Cụ AI' },
    { id: 'deals', name: 'Săn Kèo' },
    { id: 'ai-advisor', name: 'Tư Vấn AI' },
    { id: 'share', name: 'Chia Sẻ' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 glass px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0" 
          onClick={() => setActiveTab('home')}
        >
          <div className="bg-red-600 p-2 rounded-lg shadow-lg shadow-red-900/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white hidden sm:block">
            MMO <span className="text-red-600">Hub</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center space-x-6 overflow-x-auto no-scrollbar">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.id)}
              className={`text-sm font-medium transition-all duration-200 hover:text-red-500 whitespace-nowrap ${
                activeTab === menu.id ? 'text-red-500 border-b-2 border-red-500 pb-1' : 'text-zinc-400'
              }`}
            >
              {menu.name}
            </button>
          ))}
        </div>

        <div className="lg:hidden flex overflow-x-auto gap-4 px-2 no-scrollbar max-w-[150px] sm:max-w-md">
           {menus.slice(0, 3).map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.id)}
              className={`text-xs font-medium whitespace-nowrap ${
                activeTab === menu.id ? 'text-red-500' : 'text-zinc-500'
              }`}
            >
              {menu.name}
            </button>
          ))}
          <button onClick={() => setActiveTab('ai-advisor')} className="text-xs text-red-500 font-bold">More+</button>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-red-600 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-red-700 transition shadow-lg shadow-red-900/40 whitespace-nowrap">
            Khám phá
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
