'use client';

import React, { useState, useEffect } from 'react';
import { AppView, CampaignData, DailyCampaignItem } from '../types';
import { MapPin, Users, Vote, Megaphone, Calendar, ChevronRight, Sparkles } from 'lucide-react';

interface HeroProps {
  setView: (view: AppView) => void;
  data: CampaignData;
}

const ElectionBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-[40px] mb-8 shadow-2xl group border border-white/20">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-green-700 to-green-900 opacity-100"></div>
      <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_60%)] animate-[spin_20s_linear_infinite] pointer-events-none"></div>

      <div className="relative p-10 flex flex-col items-center text-center z-10">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2 rounded-full text-white text-[11px] font-bold uppercase tracking-[0.25em] border border-white/10 mb-8 animate-pulse shadow-2xl">
           <Sparkles size={14} className="text-yellow-400" /> ২০২৬ নির্বাচনী প্রচারণা
        </div>
        
        <h1 className="text-white font-black text-4xl mb-2 tracking-tighter drop-shadow-2xl">
          জাতীয় সংসদ নির্বাচন <span className="text-yellow-400 block sm:inline mt-2 sm:mt-0 float-animation">২০২৬</span>
        </h1>
        
        <div className="my-10 relative w-44 h-44 flex items-center justify-center">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-[80px] animate-pulse"></div>
            <svg viewBox="0 0 100 100" className="w-full h-full text-white drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] scale-125 transition-transform duration-700 group-hover:scale-[1.3]" fill="currentColor">
                <rect x="49" y="8" width="2" height="32" rx="1" fill="white" />
                <circle cx="50" cy="8" r="3" fill="white" />
                <rect x="46" y="38" width="8" height="5" rx="1.5" fill="white" />
                <path d="M50,22 L48,12 L52,12 Z" fill="#FACC15" />
                <path d="M15,32 C15,32 35,26 50,26 C65,26 85,32 85,32 L85,35 C85,35 65,29 50,29 C35,29 15,35 15,35 Z" fill="white" />
                <circle cx="15" cy="33.5" r="2.5" fill="white" />
                <path d="M15,33.5 L5,75 L25,75 Z" fill="white" opacity="0.9" />
                <path d="M3,75 C3,88 27,88 27,75 L27,73 L3,73 Z" fill="white" />
                <line x1="15" y1="33.5" x2="15" y2="73" stroke="white" strokeWidth="1" strokeDasharray="2 1" />
                <circle cx="85" cy="33.5" r="2.5" fill="white" />
                <path d="M85,33.5 L75,75 L95,75 Z" fill="white" opacity="0.9" />
                <path d="M73,75 C73,88 97,88 97,75 L97,73 L73,73 Z" fill="white" />
                <line x1="85" y1="33.5" x2="85" y2="73" stroke="white" strokeWidth="1" strokeDasharray="2 1" />
            </svg>
        </div>

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 px-10 py-5 rounded-[32px] shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)]">
            <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-1">
                দাড়িপাল্লায় <span className="text-yellow-400">ভোট দিন</span>
            </h2>
            <p className="text-green-100 text-xs font-bold italic tracking-wider opacity-90">ইনসাফ কায়েমে মাওলানা মাহফুজুর রহমানকে জয়যুক্ত করুন</p>
        </div>
      </div>
      <div className="absolute top-10 right-10 text-yellow-300/30 animate-pulse"><Sparkles size={24} /></div>
      <div className="absolute bottom-10 left-10 text-yellow-300/20 animate-pulse delay-700"><Sparkles size={20} /></div>
    </div>
  );
};

const Slideshow: React.FC<{ items: DailyCampaignItem[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="relative h-64 rounded-[32px] overflow-hidden shadow-2xl group">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={item.image || "/placeholder.svg"}
            className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-110"
            alt={item.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">Campaign 2026</span>
                <span className="text-[10px] font-bold opacity-70">{item.date}</span>
            </div>
            <h3 className="font-black text-xl leading-tight mb-2">{item.title}</h3>
            <p className="text-xs opacity-80 flex items-center gap-1 font-medium italic">
              <MapPin size={12} className="text-green-400" /> "{item.location}"
            </p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 right-8 flex gap-2">
        {items.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex ? 'w-8 bg-green-500' : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ setView, data }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-01-05T00:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 space-y-8 pb-32 animate-in fade-in zoom-in-95 duration-1000">
      <ElectionBanner />
      <Slideshow items={data.dailyCampaigns} />

      <div className="relative overflow-hidden rounded-[32px] election-gradient p-8 text-white shadow-2xl group border border-white/10">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl border-4 border-white/20 overflow-hidden shadow-2xl shrink-0 bg-green-900 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
             {data.profileImage ? (
               <img 
                 src={data.profileImage || "/placeholder.svg"} 
                 alt={data.candidateName} 
                 className="w-full h-full object-cover"
               />
             ) : (
               <span className="text-3xl font-bold text-white/50">{data.candidateName?.charAt(0) || 'M'}</span>
             )}
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">{data.candidateName}</h2>
            <div className="flex items-center gap-1 text-green-300 text-xs font-bold mt-1">
                <MapPin size={12} /> {data.constituency}
            </div>
            <p className="text-[11px] mt-3 italic text-green-100/80 leading-snug font-medium">"{data.tagline}"</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 border border-slate-300 rounded-[28px] p-5 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shadow-inner">
                 <Calendar size={24} />
             </div>
             <div>
                 <span className="block text-[10px] text-slate-500 font-black uppercase tracking-widest">নির্বাচন সমাগত ২০২৬</span>
                 <span className="text-sm font-bold text-slate-800">ভোটের দিন ঘনিয়ে আসছে</span>
             </div>
         </div>
         <div className="flex gap-2">
            {[
              { val: timeLeft.days, label: 'দিন' },
              { val: timeLeft.hours, label: 'ঘণ্টা' },
              { val: timeLeft.mins, label: 'মিনিট' }
            ].map((t, i) => (
              <div key={i} className="text-center bg-slate-200 px-2 py-1.5 rounded-xl min-w-[36px] border border-slate-300">
                  <span className="block text-sm font-black text-green-900">{t.val}</span>
                  <span className="text-[8px] font-bold text-slate-500">{t.label}</span>
              </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setView(AppView.MANIFESTO)}
          className="bg-slate-100 p-6 rounded-[32px] shadow-sm border border-slate-300 flex flex-col items-center text-center gap-4 hover:shadow-xl hover:border-green-300 hover:-translate-y-1 transition-all active:scale-95 group"
        >
          <div className="w-14 h-14 bg-green-50 text-green-700 rounded-[22px] flex items-center justify-center group-hover:bg-green-700 group-hover:text-white transition-colors duration-500">
            <Vote size={28} />
          </div>
          <span className="block font-black text-slate-800 text-sm">নির্বাচনী ইশতেহার</span>
        </button>

        <button 
          onClick={() => setView(AppView.VOLUNTEER)}
          className="bg-slate-100 p-6 rounded-[32px] shadow-sm border border-slate-300 flex flex-col items-center text-center gap-4 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all active:scale-95 group"
        >
          <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-[22px] flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors duration-500">
            <Users size={28} />
          </div>
          <span className="block font-black text-slate-800 text-sm">স্বেচ্ছাসেবক হোন</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs">
            <Megaphone size={18} className="text-red-500" /> নির্বাচনী ডায়েরি (Latest Updates)
          </h3>
          <button className="text-[10px] font-black text-green-700 uppercase tracking-widest border-b-2 border-green-200">See All</button>
        </div>
        
        <div className="space-y-6">
          {data.dailyCampaigns.map((item) => (
            <div key={item.id} className="bg-slate-100 rounded-[32px] shadow-sm border border-slate-300 overflow-hidden flex flex-col hover:shadow-2xl transition-all group">
              <div className="h-52 w-full relative overflow-hidden">
                <img src={item.image || "/placeholder.svg"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                <div className="absolute top-4 left-4 bg-green-700 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">New Post</div>
                <div className="absolute bottom-4 left-4 bg-slate-100/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-slate-800 shadow-2xl flex items-center gap-2 border border-slate-300">
                   <MapPin size={14} className="text-green-700" /> {item.location}
                </div>
              </div>
              <div className="p-6">
                <span className="text-[10px] text-slate-500 font-bold mb-2 block tracking-widest uppercase">{item.date}</span>
                <h4 className="font-black text-slate-800 text-lg leading-tight group-hover:text-green-800 transition-colors">{item.title}</h4>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed italic font-medium">
                  {item.description}
                </p>
                <button className="mt-5 text-green-700 text-xs font-black uppercase tracking-widest flex items-center gap-2 group/btn">
                    Read More <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
