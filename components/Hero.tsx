
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative py-24 overflow-hidden bg-zinc-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute top-0 right-10 w-96 h-96 bg-rose-900 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-red-800 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-red-500 uppercase bg-red-950/30 border border-red-900/50 rounded-full">
          Cộng đồng MMO Pro
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          Hành trình tự do <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">Tài chính Online</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-zinc-400 mb-10 leading-relaxed">
          Chia sẻ lộ trình thực chiến từ Affiliate, Dropshipping đến Crypto. 
          Hợp tác cùng Trợ lý AI để tối ưu hóa dòng tiền của bạn.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-2xl shadow-red-900/40">
            Xem lộ trình Miễn phí
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition border border-zinc-800">
            Hỏi Trợ lý AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
