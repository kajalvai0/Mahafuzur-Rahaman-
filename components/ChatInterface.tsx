
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatInterfaceProps {
  instruction: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ instruction }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'আসসালামু আলাইকুম! আপনি প্রার্থীর পরিকল্পনা বা এলাকা নিয়ে যেকোনো প্রশ্ন করতে পারেন।',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => `${m.sender}: ${m.text}`);
    const responseText = await sendMessageToGemini(history, userMsg.text, instruction);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-200 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-100 p-4 border-b border-slate-300 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-200">
                <Sparkles size={20} />
            </div>
            <div>
                <h3 className="font-bold text-slate-800 leading-tight">স্মার্ট প্রতিনিধি (AI)</h3>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> সক্রিয় আছেন
                </span>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 ${msg.sender === 'user' ? 'bg-slate-300 text-slate-600' : 'bg-emerald-700 text-white shadow-lg'}`}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`p-4 rounded-3xl shadow-sm text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-emerald-700 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 border border-slate-300 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-3xl shadow-sm border border-slate-300">
                <Loader2 size={16} className="animate-spin text-emerald-700" />
                <span className="text-xs text-slate-500">তথ্য খুঁজছি...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-100 border-t border-slate-300 safe-bottom shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex gap-2 bg-slate-200 rounded-2xl p-1 border border-slate-300">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="প্রশ্ন লিখুন..."
            className="flex-1 bg-transparent border-0 px-4 py-3 focus:ring-0 outline-none text-sm placeholder-slate-500"
            />
            <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-emerald-700 text-white p-3 rounded-xl shadow-lg active:scale-90 transition-all"
            >
            <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};
