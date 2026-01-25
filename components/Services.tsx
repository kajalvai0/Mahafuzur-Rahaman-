import React, { useState } from 'react';
import { Heart, Phone, Users, Droplet, Briefcase, Cpu, GraduationCap, Banknote, ChevronRight, Sparkles, CheckCircle } from 'lucide-react';
import { AppView } from '../types';

interface ServicesProps {
    setView: (view: AppView) => void;
}

export const Services: React.FC<ServicesProps> = ({ setView }) => {
  const additionalServices = [
    {
        title: 'চাকরি তথ্য',
        desc: 'বদলগাছি ও মহাদেবপুরের বেকারদের জন্য স্থানীয় ও জাতীয় কর্মসংস্থান আপডেট।',
        icon: <Briefcase size={22} />,
        color: 'bg-indigo-50 text-indigo-700',
        borderColor: 'border-indigo-500'
    },
    {
        title: 'দক্ষতা অর্জন',
        desc: 'আইটি, গ্রাফিক্স ও কারিগরি প্রশিক্ষণের ফ্রি গাইডলাইন ও সেশন ডিটেইলস।',
        icon: <Cpu size={22} />,
        color: 'bg-emerald-50 text-emerald-700',
        borderColor: 'border-emerald-500'
    },
    {
        title: 'শিক্ষা সহায়তা',
        desc: 'উপবৃত্তি, উচ্চশিক্ষা এবং ছাত্র পরামর্শ কেন্দ্র সংক্রান্ত জরুরি তথ্য।',
        icon: <GraduationCap size={22} />,
        color: 'bg-amber-50 text-amber-700',
        borderColor: 'border-amber-500'
    },
    {
        title: 'কর্জে হাসানা',
        desc: 'অসহায় উদ্যোক্তাদের জন্য সুদবিহীন ঋণ ও ফিন্যান্সিয়াল গাইডেন্স।',
        icon: <Banknote size={22} />,
        color: 'bg-teal-50 text-teal-700',
        borderColor: 'border-teal-500'
    }
  ];

  return (
    <div className="p-4 space-y-8 pb-32 animate-in fade-in slide-in-from-bottom-6 duration-700">
       <div className="text-center mb-8 pt-6">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-3 border border-emerald-200">
           <Sparkles size={12} /> খেদমতে খলক (জনসেবা)
        </div>
        <h2 className="text-3xl font-black text-slate-800 leading-tight">জনসেবা মডিউল</h2>
        <p className="text-slate-600 text-sm font-medium italic mt-1">"শুধু ভোট নয়, আমরা আছি আপনার প্রতিটি প্রয়োজনে"</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-slate-100 p-6 rounded-[32px] shadow-sm border-l-8 border-red-500 flex items-center gap-5 hover:shadow-xl transition-all hover:scale-[1.01] group border border-slate-300">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-[22px] flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
                <Droplet size={32} />
            </div>
            <div className="flex-1">
                <h3 className="font-black text-slate-800 text-lg">ব্লাড ব্যাংক</h3>
                <p className="text-xs text-slate-500 font-medium">জরুরি রক্তের প্রয়োজনে এলাকার ডোনারদের সাথে যোগাযোগ করুন।</p>
            </div>
            <button className="bg-red-600 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg shadow-red-200 active:scale-95 transition-transform uppercase tracking-widest">
                খুঁজুন
            </button>
        </div>

        <div className="bg-slate-100 p-6 rounded-[32px] shadow-sm border-l-8 border-blue-600 flex items-center gap-5 hover:shadow-xl transition-all hover:scale-[1.01] group border border-slate-300">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[22px] flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                <Heart size={32} />
            </div>
            <div className="flex-1">
                <h3 className="font-black text-slate-800 text-lg">ফ্রি এম্বুলেন্স</h3>
                <p className="text-xs text-slate-500 font-medium">অসহায় ও দরিদ্র রোগীদের জন্য মাওলানা মাহফুজুর রহমানের উপহার।</p>
            </div>
            <button className="bg-blue-600 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg shadow-blue-200 active:scale-95 transition-transform uppercase tracking-widest">
                কল দিন
            </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
            {additionalServices.map((service, index) => (
                <div key={index} className="bg-slate-100 p-6 rounded-[32px] shadow-sm border border-slate-300 flex flex-col gap-4 hover:border-emerald-300 hover:shadow-2xl transition-all group">
                    <div className={`w-14 h-14 ${service.color} rounded-[20px] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 border border-current opacity-80`}>
                        {service.icon}
                    </div>
                    <div>
                        <h4 className="font-black text-slate-800 text-base">{service.title}</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed mt-2 font-medium">{service.desc}</p>
                    </div>
                    <button className="mt-auto flex items-center gap-1 text-[11px] font-black text-emerald-700 uppercase tracking-widest group/btn">
                        বিস্তারিত <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            ))}
        </div>

         <div onClick={() => setView(AppView.VOLUNTEER)} className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 p-8 rounded-[40px] shadow-2xl text-white text-center cursor-pointer hover:scale-[1.02] transition-all group border border-white/10">
            <Users className="mx-auto mb-4 opacity-90 group-hover:scale-110 transition-transform duration-500" size={48} />
            <h3 className="text-2xl font-black mb-2">ডিজিটাল ভলান্টিয়ার হোন</h3>
            <p className="text-emerald-100 text-sm mb-6 font-medium italic">"আমাদের টিমে যোগ দিন, ইনসাফভিত্তিক আধুনিক নওগাঁ গড়ুন"</p>
            <div className="bg-slate-100 text-emerald-900 px-10 py-4 rounded-2xl font-black text-sm inline-block shadow-2xl uppercase tracking-widest group-hover:bg-yellow-400 group-hover:text-emerald-950 transition-colors">
                এখনই রেজিস্ট্রেশন করুন
            </div>
        </div>
      </div>

      <div className="bg-slate-800 p-8 rounded-[40px] text-center border border-slate-700 shadow-2xl">
        <h4 className="font-black text-emerald-400 mb-6 text-xs uppercase tracking-[0.3em]">জরুরি যোগাযোগ হেল্পলাইন</h4>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-3 bg-slate-100/10 hover:bg-white/10 px-6 py-4 rounded-2xl text-white shadow-inner border border-white/10 text-sm font-black active:scale-95 transition-all">
                <Phone size={18} className="text-emerald-500" />
                <span>বদলগাছি অফিস</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-slate-100/10 hover:bg-white/10 px-6 py-4 rounded-2xl text-white shadow-inner border border-white/10 text-sm font-black active:scale-95 transition-all">
                <Phone size={18} className="text-emerald-500" />
                <span>মহাদেবপুর অফিস</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export const VolunteerForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] p-6 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-6 border border-emerald-200">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">রেজিস্ট্রেশন সফল!</h2>
        <p className="text-slate-600 mb-6">আমাদের টিমে আপনাকে স্বাগতম। শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in duration-700">
      <div className="bg-emerald-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-2">স্বেচ্ছাসেবক হোন</h2>
          <p className="text-emerald-100 text-sm">ইনসাফ কায়েমে আমাদের সাথে যোগ দিন।</p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase px-1">আপনার নাম</label>
          <input 
            type="text" 
            required 
            placeholder="আপনার নাম লিখুন"
            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none placeholder-slate-400" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase px-1">মোবাইল নম্বর</label>
          <input 
            type="tel" 
            required 
            placeholder="০১XXXXXXXXX"
            className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none placeholder-slate-400" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase px-1">এলাকা/উপজেলা</label>
          <select className="w-full p-4 bg-slate-100 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none">
            <option>মহাদেবপুর</option>
            <option>বদলগাছি</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="w-full bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-emerald-800 active:scale-95 transition-all mt-4 uppercase tracking-widest"
        >
          রেজিস্ট্রেশন করুন
        </button>
      </form>
    </div>
  );
};
