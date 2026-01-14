
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GuideCard from './components/GuideCard';
import { Guide, Message } from './types';
import { chatWithAI, refinePostContent } from './services/gemini';

const MOCK_GUIDES: Guide[] = [
  {
    id: '1',
    title: 'Hướng dẫn Affiliate Marketing cho người mới bắt đầu 2024',
    excerpt: 'Khám phá cách bắt đầu kiếm tiền với tiếp thị liên kết từ số 0. Lựa chọn niche, đăng ký mạng lưới và cách thu hút traffic.',
    content: '',
    category: 'Affiliate',
    author: 'Admin',
    date: '24/05/2024',
    imageUrl: 'https://picsum.photos/seed/aff/800/450',
    readTime: '15 phút'
  },
  {
    id: '2',
    title: 'Dropshipping trên TikTok Shop: Cơ hội hay Thách thức?',
    excerpt: 'TikTok Shop đang bùng nổ, làm thế nào để xây dựng hệ thống Dropshipping vận hành tự động và tối ưu lợi nhuận.',
    content: '',
    category: 'Dropshipping',
    author: 'Lâm MMO',
    date: '22/05/2024',
    imageUrl: 'https://picsum.photos/seed/drop/800/450',
    readTime: '10 phút'
  },
  {
    id: '3',
    title: 'Top 5 ngách Freelancing hái ra tiền trong kỷ nguyên AI',
    excerpt: 'AI đang thay đổi cách làm việc freelance. Xem ngay những kỹ năng mới đang được săn đón với thù lao cao ngất ngưởng.',
    content: '',
    category: 'Freelancing',
    author: 'Minh Content',
    date: '20/05/2024',
    imageUrl: 'https://picsum.photos/seed/free/800/450',
    readTime: '12 phút'
  },
  {
    id: '4',
    title: 'Crypto Airdrop: Cách săn kèo nghìn đô an toàn',
    excerpt: 'Tìm hiểu quy trình tham gia các dự án crypto sớm để nhận airdrop. Hướng dẫn sử dụng ví và tránh scam.',
    content: '',
    category: 'Crypto',
    author: 'Crypto King',
    date: '18/05/2024',
    imageUrl: 'https://picsum.photos/seed/crypto/800/450',
    readTime: '20 phút'
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Chào đồng nghiệp MMO! Tôi là trợ lý AI. Bạn muốn tôi giúp gì hôm nay? Phân tích ngách, tư vấn lộ trình hay săn kèo Airdrop?' }
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
      setMessages(prev => [...prev, { role: 'assistant', text: response || 'Rất tiếc, tôi đang gặp lỗi kỹ thuật.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: 'Có lỗi xảy ra khi kết nối với AI.' }]);
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
      alert("Không thể tối ưu nội dung lúc này.");
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-red-500/30">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero />
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Kiến thức mới</h2>
                  <p className="text-zinc-500">Cập nhật chiến thuật MMO thực chiến nhất</p>
                </div>
                <button 
                  onClick={() => setActiveTab('guides')}
                  className="text-red-500 font-bold hover:text-red-400 transition"
                >
                  Tất cả bài viết &rarr;
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {MOCK_GUIDES.map(guide => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'guides' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black mb-4 text-white uppercase italic">Kho tài liệu MMO</h1>
            <p className="text-zinc-500 mb-8">500+ Bài viết chiến thuật, không cần đăng nhập để xem.</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {['Tất cả', 'Affiliate', 'Dropshipping', 'Freelancing', 'Crypto', 'YouTube', 'TikTok'].map(cat => (
                <button key={cat} className="px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-red-600 hover:text-red-500 transition text-sm font-bold">
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_GUIDES.concat(MOCK_GUIDES).map((guide, idx) => (
                <GuideCard key={idx} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'roadmap' && (
          <section className="max-w-5xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-black text-center mb-16 text-white uppercase italic tracking-widest">Lộ trình bứt phá</h1>
            <div className="space-y-10 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-red-600 before:via-zinc-800 before:to-transparent">
              {[
                { step: '01', title: 'Nền tảng vững chắc', desc: 'Thiết lập hệ thống thanh toán quốc tế (Payoneer, PingPong), bảo mật đa lớp và các công cụ AI cốt lõi.' },
                { step: '02', title: 'Phân tích ngách AI', desc: 'Sử dụng AI để tìm kiếm các ngách ít cạnh tranh nhưng có lợi nhuận cao trên Global Market.' },
                { step: '03', title: 'Xây dựng Traffic hữu cơ', desc: 'Chiến thuật Viral Social (TikTok, Reels, Shorts) để kéo traffic miễn phí chất lượng cao.' },
                { step: '04', title: 'Vận hành & Tự động hóa', desc: 'Scale-up dự án thông qua team outsource hoặc hệ thống bot tự động hóa quy trình.' },
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-zinc-800 bg-zinc-950 text-zinc-500 shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all duration-300">
                    <span className="text-xs font-black">{item.step}</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl transition hover:border-red-900/50">
                    <h3 className="font-black text-xl mb-3 text-red-500 uppercase italic">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'tools' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black mb-4 text-white uppercase">Vũ khí AI</h1>
            <p className="text-zinc-500 mb-10">Tools mạnh nhất để tối ưu hóa hiệu suất MMO của bạn.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'AI Copywriting', desc: 'Viết sales page, blog content chuẩn SEO trong vài giây.', icon: '✍️' },
                { name: 'Video Faceless Bot', desc: 'Tạo video TikTok triệu view mà không cần lộ mặt.', icon: '🎥' },
                { name: 'Niche Spy AI', desc: 'Do thám đối thủ và tìm ra sản phẩm winning nhanh nhất.', icon: '🔍' },
                { name: 'Auto Social Bot', desc: 'Hệ thống quản lý hàng trăm tài khoản mạng xã hội.', icon: '🤖' },
                { name: 'Visual AI Pro', desc: 'Tạo hình ảnh quảng cáo thu hút, chuyển đổi cao.', icon: '🎨' },
                { name: 'Global Translator', desc: 'Phá vỡ rào cản ngôn ngữ để làm MMO quốc tế.', icon: '🌐' },
              ].map((tool, i) => (
                <div key={i} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-red-600/50 transition-all hover:-translate-y-2">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-black mb-2 text-white">{tool.name}</h3>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{tool.desc}</p>
                  <button className="text-red-500 font-bold text-sm hover:text-red-400">Launch Tool &rarr;</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'deals' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black mb-4 text-white uppercase">Săn Kèo Hot</h1>
            <p className="text-zinc-500 mb-10">Cập nhật realtime các kèo Airdrop, Affiliate lợi nhuận cao.</p>
            <div className="space-y-4">
              {[
                { title: 'Airdrop Dự án X Layer (OKX)', potential: '$1000+', status: 'HOT', difficulty: 'Hard' },
                { title: 'Affiliate Campaign: VPS Super Sale', potential: '50% RevShare', status: 'NEW', difficulty: 'Easy' },
                { title: 'Kèo Testnet: Babylon Staking', potential: 'Mainnet Tokens', status: 'ONGOING', difficulty: 'Medium' },
              ].map((deal, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-red-600/30 transition">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black rounded">{deal.status}</span>
                      <h3 className="font-bold text-lg text-white">{deal.title}</h3>
                    </div>
                    <div className="flex gap-4 text-sm text-zinc-500">
                      <span>Tiềm năng: <b className="text-red-500">{deal.potential}</b></span>
                      <span>Độ khó: <b className="text-zinc-300">{deal.difficulty}</b></span>
                    </div>
                  </div>
                  <button className="px-8 py-2 bg-red-600 text-white rounded-lg text-sm font-black hover:bg-red-700 transition shadow-lg shadow-red-900/20">Chi tiết</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'ai-advisor' && (
          <section className="max-w-4xl mx-auto px-4 py-12 h-[calc(100vh-80px)] flex flex-col">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black text-white mb-3 uppercase italic tracking-tighter">Trợ lý <span className="text-red-600">MMO AI</span></h1>
              <p className="text-zinc-500 font-medium">Chiến lược gia cá nhân cho mọi dự án của bạn.</p>
            </div>
            
            <div className="flex-grow flex flex-col bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden mb-4">
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-md ${
                      msg.role === 'user' 
                        ? 'bg-red-600 text-white rounded-tr-none' 
                        : 'bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-tl-none'
                    }`}>
                      <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 rounded-2xl px-5 py-4 rounded-tl-none">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-zinc-800 bg-zinc-950">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Hỏi AI về Affiliate, Dropshipping..."
                    className="flex-grow px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition placeholder:text-zinc-600"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="bg-red-600 text-white px-5 rounded-xl hover:bg-red-700 transition disabled:opacity-50 shadow-lg shadow-red-900/30"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'share' && (
          <section className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 shadow-2xl">
              <h1 className="text-3xl font-black mb-4 text-white uppercase italic">Góp sức cộng đồng</h1>
              <p className="text-zinc-500 mb-8 font-medium">Kinh nghiệm của bạn là kho báu của người khác. Chia sẻ ngay!</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-widest">Tiêu đề bài viết</label>
                  <input
                    type="text"
                    value={shareTitle}
                    onChange={(e) => setShareTitle(e.target.value)}
                    placeholder="VD: Case Study $2000/tháng từ KDP Amazon"
                    className="w-full px-5 py-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-zinc-400 uppercase tracking-widest">Nội dung</label>
                    <button 
                      onClick={handleRefine}
                      disabled={isRefining || !shareContent}
                      className="text-xs font-black text-red-500 flex items-center gap-1 hover:text-red-400 transition disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {isRefining ? 'ĐANG TỐI ƯU...' : 'AI OPTIMIZE CONTENT'}
                    </button>
                  </div>
                  <textarea
                    rows={12}
                    value={shareContent}
                    onChange={(e) => setShareContent(e.target.value)}
                    placeholder="Hãy kể về hành trình và những bài học của bạn..."
                    className="w-full px-5 py-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition font-sans text-base leading-relaxed"
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <button className="px-10 py-4 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition shadow-2xl shadow-red-900/40 uppercase tracking-widest">
                    Đăng bài viết
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-black text-white py-16 px-4 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-red-600 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-black italic">MMO <span className="text-red-600">HUB</span></span>
            </div>
            <p className="text-zinc-500 max-w-md leading-relaxed text-sm font-medium">
              Cổng thông tin MMO hiện đại nhất Việt Nam. Kết hợp sức mạnh cộng đồng và Trí tuệ nhân tạo để chinh phục thị trường Global.
            </p>
          </div>
          
          <div>
            <h4 className="font-black mb-6 uppercase text-red-500 tracking-tighter">Ngách Hot</h4>
            <ul className="space-y-4 text-zinc-400 text-sm font-bold">
              <li><a href="#" className="hover:text-white transition">TikTok Ads/Affiliate</a></li>
              <li><a href="#" className="hover:text-white transition">Print on Demand</a></li>
              <li><a href="#" className="hover:text-white transition">Amazon KDP AI</a></li>
              <li><a href="#" className="hover:text-white transition">Web3 Airdrops</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 uppercase text-red-500 tracking-tighter">Kết nối</h4>
            <ul className="space-y-4 text-zinc-400 text-sm font-bold">
              <li><a href="#" className="hover:text-white transition">Cộng đồng Discord</a></li>
              <li><a href="#" className="hover:text-white transition">Kênh VIP Telegram</a></li>
              <li><a href="#" className="hover:text-white transition">Hợp tác Agency</a></li>
              <li><a href="#" className="hover:text-white transition">Đóng góp ý tưởng</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-16 pt-8 text-center text-zinc-700 text-[10px] font-black uppercase tracking-[0.2em]">
          © 2024 MMO HUB PRO - NO REGISTRATION REQUIRED.
        </div>
      </footer>
    </div>
  );
};

export default App;
