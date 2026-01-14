
export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

export type Category = 'Affiliate' | 'Dropshipping' | 'Crypto' | 'Freelancing' | 'TikTok' | 'YouTube';

export interface Message {
  role: 'user' | 'assistant';
  text: string;
}
