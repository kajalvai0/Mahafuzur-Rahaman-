import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown, ChevronUp, ShieldCheck, Scale, Leaf, BookOpen, Users, Wallet, Sparkles } from 'lucide-react';
import { ManifestoItem } from '../types';

const chartData = [
  { name: 'পূর্বের দুর্নীতি', value: 85 },
  { name: 'আমাদের লক্ষ্য', value: 5 },
];

interface ManifestoProps {
  data: ManifestoItem[];
}

const ManifestoCard: React.FC<{ item: ManifestoItem }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = (title: string) => {
    if (title.includes("ইনসাফ")) return <Scale size={20} />;
    if (title.includes("দুর্নীতি")) return <ShieldCheck size={20} />;
    if (title.includes("অর্থনীতি")) return <Wallet size={20} />;
    if (title.includes("শিক্ষা")) return <BookOpen size={20} />;
    if (title.includes("নারী") || title.includes("অধিকার")) return <Users size={20} />;
    return <Sparkles size={20} />;
  };

  return (
    <div 
      className={`bg-slate-100 rounded-3xl shadow-sm border border-slate-300 overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-emerald-500 shadow-lg scale-[1.02]' : 'hover:shadow-md'}`}
    >
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center gap-4 text-left"
      >
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-inner"
          style={{ backgroundColor: item.color }}
        >
          {getIcon(item.title)}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
          {!isExpanded && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.description}</p>
          )}
        </div>
        <div className="text-slate-400">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-5 pb-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="h-[1px] bg-slate-200 mb-4"></div>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {item.description}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
              <span className="text-[10px] text-emerald-700 font-bold uppercase block mb-1">প্রাধিকার</span>
              <p className="text-[11px] text-emerald-900">ইনসাফ ভিত্তিক সমাজ</p>
            </div>
            <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
              <span className="text-[10px] text-emerald-700 font-bold uppercase block mb-1">বাস্তবায়ন</span>
              <p className="text-[11px] text-emerald-900">স্বচ্ছ ডিজিটাল ব্যবস্থা</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Manifesto: React.FC<ManifestoProps> = ({ data }) => {
  return (
    <div className="p-4 space-y-8 pb-24 animate-in fade-in duration-700">
      <div className="relative rounded-[40px] overflow-hidden election-gradient p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10 space-y-3">
          <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-flex items-center gap-2 text-xs font-bold border border-white/10">
             <Leaf size={12} className="text-emerald-300" /> ইশতেহার ২০২৫-২৬
          </div>
          <h2 className="text-3xl font-extrabold leading-tight">বাংলাদেশ জামায়াতে ইসলামী এর নির্বাচনী ভিশন ২০২৬</h2>
          <p className="text-emerald-100/80 text-sm leading-relaxed">
            একটি সমৃদ্ধ, ইনসাফপূর্ণ ও দুর্নীতিমুক্ত বাংলাদেশ গড়ার লক্ষে আমাদের সুনির্দিষ্ট অঙ্গীকারসমূহ।
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-slate-800 uppercase tracking-widest text-[10px]">প্রধান অঙ্গীকারসমূহ</h3>
          <span className="h-[1px] bg-slate-300 flex-1 ml-4"></span>
        </div>
        <div className="space-y-4">
          {data.map((item) => (
            <ManifestoCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="bg-slate-100 p-6 rounded-[32px] shadow-sm border border-slate-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">দুর্নীতি দমনে আমাদের লক্ষ্য</h3>
            <p className="text-[10px] text-slate-500">তুলনামূলক উন্নয়ন সূচক</p>
          </div>
        </div>
        
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: '#f1f5f9'}}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#f8fafc' }}
              />
              <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={45}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#059669'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 bg-slate-200 p-4 rounded-2xl border border-slate-300">
           <p className="text-[11px] text-slate-600 italic text-center leading-relaxed">
             "আমরা বিশ্বাস করি একটি সৎ ও যোগ্য নেতৃত্বই পারে দুর্নীতির অভিশাপ থেকে দেশকে মুক্ত করতে।"
           </p>
        </div>
      </div>

      <div className="bg-emerald-900 rounded-[32px] p-6 text-center text-white space-y-4 shadow-xl">
         <h4 className="font-bold text-lg">আপনার মতামত আমাদের শক্তি</h4>
         <p className="text-emerald-100 text-xs">২০২৬ এর ইশতেহার নিয়ে আপনার কোনো পরামর্শ থাকলে আমাদের জানান।</p>
         <button className="bg-slate-100 text-emerald-900 px-8 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-lg">
           পরামর্শ দিন
         </button>
      </div>
    </div>
  );
};
