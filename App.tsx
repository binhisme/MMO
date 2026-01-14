
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GuideCard from './components/GuideCard';
import { Guide, Message } from './types';
import { chatWithAI, refinePostContent } from './services/gemini';

const MOCK_GUIDES: Guide[] = [
  {
    id: '1',
    title: 'Liquid Affiliate: Chảy vào mọi ngách thị trường 2024',
    excerpt: 'Hệ thống kéo traffic tự động sử dụng Deep AI và kịch bản viral mượt mà như nước.',
    content: '',
    category: 'Affiliate',
    author: 'ZERO ONE',
    date: '24/05/2024',
    imageUrl: 'https://picsum.photos/seed/liquid1/800/450',
    readTime: '12 PHÚT'
  },
  {
    id: '2',
    title: 'TikTok Shop Global: Xây dựng dòng tiền xuyên biên giới',
    excerpt: 'Kỹ thuật lách luật và tối ưu hóa vận hành quốc tế không cần lộ mặt.',
    content: '',
    category: 'Dropshipping',
    author: 'GHOST OPERATOR',
    date: '22/05/2024',
    imageUrl: 'https://picsum.photos/seed/liquid2/800/450',
    readTime: '08 PHÚT'
  },
  {
    id: '3',
    title: 'Tư duy "Chất Lỏng" trong Freelancing AI',
    excerpt: 'Đừng là một công nhân AI, hãy là một kiến trúc sư hệ thống. Scale công việc x100 lần.',
    content: '',
    category: 'Freelancing',
    author: 'LOGIC BOMB',
    date: '20/05/2024',
    imageUrl: 'https://picsum.photos/seed/liquid3/800/450',
    readTime: '15 PHÚT'
  },
  {
    id: '4',
    title: 'Dark Crypto: Săn những đợt sóng ngầm Airdrop',
    excerpt: 'Cách nhận diện các dự án "Liquid Gold" trước khi chúng được cộng đồng chú ý.',
    content: '',
    category: 'Crypto',
    author: 'DEEP DIVE',
    date: '18/05/2024',
    imageUrl: 'https://picsum.photos/seed/liquid4/800/450',
    readTime: '25 PHÚT'
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hệ thống đã sẵn sàng. Bạn muốn khai thác dòng tiền từ ngách nào hôm nay? Tôi có dữ liệu mới nhất về TikTok Shop và Crypto.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [shareTitle, setShareTitle] = useState('');
  const [shareContent, setShareContent] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;
    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));
      const response = await chatWithAI(userMsg, history);
      setMessages(prev => [...prev, { role: 'assistant', text: response || 'Hệ thống đang bảo trì lõi AI, thử lại sau.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Lỗi truy xuất dữ liệu.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!shareContent.trim() || isRefining) return;
    setIsRefining(true);
    try {
      const refined = await refinePostContent(shareContent);
      if (refined) setShareContent(refined);
    } catch (err) {
      alert("Lỗi tối ưu.");
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-red-600/50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero />
            <section className="max-w-7xl mx-auto px-4 py-24">
              <div className="flex items-end justify-between mb-20">
                <div className="space-y-3">
                  <h2 className="text-5xl font-[950] text-white uppercase italic tracking-tighter">
                    DÒNG CHẢY <span className="shimmer-text">TRI THỨC</span>
                  </h2>
                  <div className="h-1.5 w-32 bg-gradient-to-r from-red-600 to-transparent rounded-full shadow-[0_0_15px_rgba(185,28,28,0.6)]"></div>
                </div>
                <button onClick={() => setActiveTab('guides')} className="liquid-glass px-8 py-3 rounded-xl text-red-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition-all">KHÁM PHÁ THƯ VIỆN &rarr;</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {MOCK_GUIDES.map(guide => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'guides' && (
          <section className="max-w-7xl mx-auto px-4 py-20">
            <h1 className="text-6xl font-[950] mb-8 uppercase italic text-white tracking-tighter">THƯ VIỆN CHẤT LỎNG</h1>
            <p className="text-zinc-500 mb-14 font-bold max-w-2xl text-lg italic">Dữ liệu được cập nhật từ các Underground Group uy tín nhất thế giới.</p>
            <div className="flex flex-wrap gap-4 mb-16">
              {['Tất cả', 'Affiliate', 'Dropshipping', 'Freelancing', 'Crypto'].map(cat => (
                <button key={cat} className="px-8 py-3 rounded-2xl border border-white/5 liquid-glass text-zinc-500 hover:text-red-500 hover:border-red-600/50 transition-all text-xs font-black uppercase tracking-[0.2em]">
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {MOCK_GUIDES.concat(MOCK_GUIDES).map((guide, idx) => (
                <GuideCard key={idx} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'ai-advisor' && (
          <section className="max-w-5xl mx-auto px-4 py-20 h-[calc(100vh-120px)] flex flex-col">
            <div className="text-center mb-14">
              <h1 className="text-5xl font-[950] text-white mb-4 uppercase italic tracking-tighter">CỐ VẤN <span className="shimmer-text blood-text-glow">LIQUID AI</span></h1>
              <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[11px] opacity-70">NEURAL NETWORK OPERATIONAL</p>
            </div>
            
            <div className="flex-grow flex flex-col liquid-glass rounded-3xl border border-white/5 shadow-2xl overflow-hidden mb-8">
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-10 no-scrollbar">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-[2rem] px-8 py-5 shadow-2xl border ${
                      msg.role === 'user' 
                        ? 'bg-red-800 text-white rounded-tr-none border-red-600' 
                        : 'bg-zinc-900/50 text-zinc-300 border-white/5 rounded-tl-none backdrop-blur-md'
                    }`}>
                      <p className="text-base font-bold whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900/50 rounded-full px-8 py-4 border border-white/5 backdrop-blur-md">
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></div>
                        <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-8 border-t border-white/5 bg-black/40">
                <div className="flex gap-5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Nhập yêu cầu chiến thuật của bạn..."
                    className="flex-grow px-8 py-5 rounded-2xl bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-900 transition font-bold placeholder:text-zinc-700"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="bg-red-800 text-white px-8 rounded-2xl hover:bg-red-700 transition glow-button shimmer-btn disabled:opacity-50"
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {(activeTab === 'roadmap' || activeTab === 'tools' || activeTab === 'deals' || activeTab === 'share') && (
          <section className="max-w-7xl mx-auto px-4 py-32 text-center">
            <div className="liquid-glass p-24 rounded-[3rem] border border-white/5 inline-block max-w-3xl">
              <h2 className="text-4xl font-[950] text-red-600 mb-8 uppercase italic tracking-tighter">DATA SYNCHRONIZING</h2>
              <p className="text-zinc-400 font-bold mb-14 text-lg">Chúng tôi đang cấu trúc lại dữ liệu cho tab <span className="text-white uppercase">{activeTab}</span> để đạt độ chính xác cao nhất.</p>
              <button onClick={() => setActiveTab('home')} className="px-14 py-5 bg-red-900 text-white font-black uppercase rounded-2xl glow-button shimmer-btn text-xs tracking-[0.2em]">Quay lại hệ thống lõi</button>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-black py-24 px-4 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-red-900 p-3 rounded-2xl">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-4xl font-[950] italic tracking-tighter">MMO <span className="shimmer-text">LIQUID</span></span>
            </div>
            <p className="text-zinc-500 max-w-md leading-relaxed text-sm font-bold uppercase tracking-widest opacity-60">
              Biến tri thức thành dòng chảy. <br/>
              Khai thác tiềm năng vô hạn của kỷ nguyên AI.
            </p>
          </div>
          
          <div>
            <h4 className="font-black mb-10 uppercase text-red-600 tracking-[0.3em] text-xs">NETWORK</h4>
            <ul className="space-y-5 text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-red-500 transition-all">Underground Discord</a></li>
              <li><a href="#" className="hover:text-red-500 transition-all">VIP Telegram Beta</a></li>
              <li><a href="#" className="hover:text-red-500 transition-all">Strategic Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-10 uppercase text-red-600 tracking-[0.3em] text-xs">LEGAL</h4>
            <ul className="space-y-5 text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-red-500 transition-all">Privacy Protocol</a></li>
              <li><a href="#" className="hover:text-red-500 transition-all">Usage Terms</a></li>
              <li><a href="#" className="hover:text-red-500 transition-all">Bug Report</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-24 pt-12 text-center">
          <p className="text-zinc-800 text-[10px] font-black uppercase tracking-[1em]">
            SYSTEM VERSION: 2.0.0-LIQUID
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
