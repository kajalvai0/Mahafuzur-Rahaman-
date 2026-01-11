
import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle, AlertTriangle, Send, Loader2 } from 'lucide-react';

export const IssueReporter: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
          <CheckCircle size={48} className="animate-bounce" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-4">রিপোর্ট সফলভাবে জমা হয়েছে!</h2>
        <p className="text-slate-600 mb-8 leading-relaxed font-medium">
          আপনার এলাকার সমস্যাটি আমাদের কেন্দ্রীয় কন্ট্রোল রুমে পাঠানো হয়েছে। আমাদের স্বেচ্ছাসেবক টিম খুব শীঘ্রই এটি যাচাই করে ব্যবস্থা গ্রহণ করবে। ইনশাআল্লাহ।
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl active:scale-95 transition-all flex items-center gap-2"
        >
          আরেকটি সমস্যা জানান
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-28 animate-in slide-in-from-bottom-4 duration-700">
      <div className="bg-gradient-to-br from-red-500 to-red-700 p-6 rounded-[32px] text-white shadow-xl shadow-red-100 relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="font-black text-xl mb-1 flex items-center gap-2">
                <AlertTriangle size={24} className="text-yellow-300" /> এলাকা সংস্কারের ডাক
            </h2>
            <p className="text-xs text-red-50 font-medium opacity-90">আপনার এলাকার যেকোনো জনদুর্ভোগের কথা আমাদের জানান। আমরা আপনার কণ্ঠস্বর হবো।</p>
        </div>
        <div className="absolute -right-8 -bottom-8 text-white/10 rotate-12">
            <AlertTriangle size={120} />
        </div>
      </div>

      <form className="space-y-5 bg-white p-6 rounded-[32px] shadow-sm border border-slate-200" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">সমস্যার ধরণ</label>
          <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-bold appearance-none cursor-pointer">
            <option>রাস্তা সংস্কার প্রয়োজন</option>
            <option>ড্রেনেজ ও পয়ঃনিষ্কাশন সমস্যা</option>
            <option>বিদ্যুৎ বিভ্রাট/ল্যাম্পপোস্ট</option>
            <option>বিশুদ্ধ পানির সংকট</option>
            <option>মাদক বা সামাজিক অবক্ষয়</option>
            <option>অন্যান্য</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">বিস্তারিত তথ্য</label>
          <textarea 
            required
            rows={4} 
            placeholder="সমস্যার সঠিক স্থান এবং বিস্তারিত এখানে লিখুন..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm resize-none placeholder-slate-400 font-medium"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-emerald-500 hover:text-emerald-700 transition-all bg-slate-50/50 hover:bg-emerald-50 active:scale-95">
            <Camera size={24} />
            <span className="text-[10px] font-black uppercase tracking-wider">ছবি যোগ করুন</span>
          </button>
          
          <button type="button" className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-blue-500 hover:text-blue-700 transition-all bg-slate-50/50 hover:bg-blue-50 active:scale-95">
            <MapPin size={24} />
            <span className="text-[10px] font-black uppercase tracking-wider">বর্তমান লোকেশন</span>
          </button>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-800 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>জমা হচ্ছে...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>রিপোর্ট জমা দিন</span>
            </>
          )}
        </button>
      </form>

      {/* Activity Tracker */}
      <div className="space-y-4">
        <h3 className="font-black text-slate-800 text-xs uppercase tracking-[0.2em] px-2">সম্প্রতি সমাধানকৃত</h3>
        <div className="space-y-4">
            <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-slate-800">মহাদেবপুর বাজার ড্রেন পরিষ্কার</h4>
                    <p className="text-[10px] text-slate-500 font-medium">১০ জন স্বেচ্ছাসেবক কাজ সম্পন্ন করেছেন</p>
                </div>
            </div>
            <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-200 flex items-center gap-4 opacity-70">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shrink-0">
                    <Loader2 size={24} className="animate-spin" />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-slate-800">বদলগাছি-মহাদেবপুর রাস্তা সার্ভে</h4>
                    <p className="text-[10px] text-slate-500 font-medium">তদন্ত রিপোর্ট প্রক্রিয়াধীন...</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
