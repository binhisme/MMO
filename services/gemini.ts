
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMMOIdea = async (niche: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Hãy tư vấn cho tôi một kế hoạch chi tiết để bắt đầu MMO trong lĩnh vực: ${niche}. Bao gồm: 1. Các bước chuẩn bị, 2. Kỹ năng cần có, 3. Ước tính thu nhập, 4. Rủi ro tiềm ẩn. Trả lời bằng tiếng Việt, trình bày chuyên nghiệp.`,
    config: {
      temperature: 0.7,
      topP: 0.95,
    }
  });
  return response.text;
};

export const chatWithAI = async (message: string, history: {role: string, parts: {text: string}[]}[]) => {
  const ai = getAI();
  // Using generateContent directly for chat-like experience as per new guidelines
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      { role: 'user', parts: [{ text: "Bạn là một chuyên gia MMO (Make Money Online) có 10 năm kinh nghiệm. Hãy trả lời câu hỏi của người dùng một cách thực tế, không hứa hẹn làm giàu nhanh chóng." }] },
      ...history.map(h => ({ role: h.role, parts: h.parts })),
      { role: 'user', parts: [{ text: message }] }
    ],
  });
  return response.text;
};

export const refinePostContent = async (rawContent: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Chỉnh sửa nội dung chia sẻ kiến thức MMO sau đây để chuyên nghiệp, dễ đọc và chuẩn SEO hơn: \n\n${rawContent}`,
  });
  return response.text;
};
