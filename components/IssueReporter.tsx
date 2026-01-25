import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle } from 'lucide-react';

export const IssueReporter: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] p-6 text-center animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">রিপোর্ট জমা হয়েছে!</h2>
        <p className="text-slate-500 mb-6">আপনার এলাকার সমস্যাটি আমাদের ডাটাবেসে যুক্ত হয়েছে। শীঘ্রই স্বেচ্ছাসেবক টিম এটি যাচাই করবে।</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-emerald-600 font-semibold hover:underline"
        >
          আরেকটি সমস্যা জানান
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg">
        <h2 className="font-bold text-emerald-800 text-lg">আমার এলাকা, আমার সমস্যা</h2>
        <p className="text-sm text-emerald-600/80">রাস্তাঘাট, ড্রেনেজ বা অন্য সমস্যা ছবিসহ জানান।</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">সমস্যার ধরণ</label>
          <select className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm">
            <option>রাস্তা সংস্কার প্রয়োজন</option>
            <option>ড্রেনেজ সমস্যা</option>
            <option>বিদ্যুৎ সমস্যা</option>
            <option>বিশুদ্ধ পানির অভাব</option>
            <option>অন্যান্য</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">বিস্তারিত লিখুন</label>
          <textarea 
            rows={4} 
            placeholder="কোথায় সমস্যা? কতদিন ধরে? বিস্তারিত..."
            className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors bg-white">
            <Camera size={24} />
            <span className="text-xs font-medium">ছবি তুলুন</span>
          </button>
          
          <button type="button" className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors bg-white">
            <MapPin size={24} />
            <span className="text-xs font-medium">লোকেশন</span>
          </button>
        </div>

        <button 
          type="submit" 
          className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-700 transition-colors mt-4"
        >
          রিপোর্ট জমা দিন
        </button>
      </form>

      {/* Commitment Tracker Preview */}
      <div className="mt-8">
        <h3 className="font-bold text-slate-700 mb-3 px-1">Commitment Tracker</h3>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2 py-1 rounded">প্রক্রিয়াধীন</span>
                <span className="text-xs text-slate-400">২ দিন আগে</span>
            </div>
            <h4 className="font-medium text-slate-800">বদলগাছি ব্রিজের ল্যাম্পপোস্ট মেরামত</h4>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-blue-500 h-full w-2/3"></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">স্বেচ্ছাসেবক টিম কাজ করছে...</p>
        </div>
      </div>
    </div>
  );
};
