
import React from 'react';
import { CampaignData } from '../types';
import { Award, BookOpen, Heart, Landmark, CheckCircle2, Facebook, Twitter, Youtube, Share2 } from 'lucide-react';

interface MPProfileProps {
  data: CampaignData;
}

export const MPProfile: React.FC<MPProfileProps> = ({ data }) => {
  const handleShare = async () => {
    const shareData = {
      title: `${data.candidateName} - ${data.constituency}`,
      text: `${data.candidateName}-এর নির্বাচনী প্রোফাইল দেখুন। ${data.tagline}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('প্রোফাইল লিংক কপি করা হয়েছে!');
      }
    } catch (err) {
      console.error('Sharing failed', err);
    }
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700 pb-24">
      <div className="relative">
         <div className="h-40 bg-emerald-700 rounded-3xl w-full"></div>
         <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-32 h-32 rounded-3xl border-4 border-white overflow-hidden shadow-2xl bg-white">
               <img src={data.profileImage} alt={data.candidateName} className="w-full h-full object-cover" />
            </div>
         </div>
         {/* Share Button Overlay */}
         <button 
           onClick={handleShare}
           className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-white/30 transition-all active:scale-90 border border-white/20 shadow-lg"
           aria-label="Share Profile"
         >
           <Share2 size={20} />
         </button>
      </div>

      <div className="text-center pt-8 space-y-2">
         <h2 className="text-2xl font-bold text-slate-800">{data.candidateName}</h2>
         <p className="text-emerald-700 font-semibold">{data.constituency}</p>
         <div className="flex flex-col items-center gap-2">
           <div className="bg-emerald-50 text-emerald-800 text-xs px-4 py-1.5 rounded-full inline-block font-bold">
              সংসদ সদস্য প্রার্থী
           </div>
           <button 
             onClick={handleShare}
             className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full hover:bg-emerald-50 transition-colors"
           >
             <Share2 size={12} /> প্রোফাইল শেয়ার করুন
           </button>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
         <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center space-y-1">
            <div className="text-blue-500 mx-auto w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-1"><Landmark size={18} /></div>
            <span className="block text-[10px] text-slate-400">অভিজ্ঞতা</span>
            <span className="block text-sm font-bold text-slate-800">১৫+ বছর</span>
         </div>
         <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center space-y-1">
            <div className="text-pink-500 mx-auto w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center mb-1"><Award size={18} /></div>
            <span className="block text-[10px] text-slate-400">সাফল্য</span>
            <span className="block text-sm font-bold text-slate-800">১০০+ প্রজেক্ট</span>
         </div>
         <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center space-y-1">
            <div className="text-emerald-500 mx-auto w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mb-1"><Heart size={18} /></div>
            <span className="block text-[10px] text-slate-400">সমর্থন</span>
            <span className="block text-sm font-bold text-slate-800">৮৫% রেটিং</span>
         </div>
      </div>

      <div className="space-y-4">
         <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <BookOpen size={20} className="text-emerald-600" /> জীবনী ও কর্মজীবন
         </h3>
         <p className="text-sm text-slate-600 leading-relaxed bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            {data.bio}
         </p>
      </div>

      <div className="space-y-4">
         <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Award size={20} className="text-emerald-600" /> উল্লেখযোগ্য অর্জন
         </h3>
         <div className="space-y-3">
            {data.achievements.map((item, i) => (
               <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  <span className="text-sm text-slate-700">{item}</span>
               </div>
            ))}
         </div>
      </div>

      {/* Social Media Section */}
      <div className="space-y-4">
         <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Share2 size={20} className="text-emerald-600" /> সামাজিক যোগাযোগ মাধ্যম
         </h3>
         <div className="flex gap-4">
            {data.socialLinks.facebook && (
              <a 
                href={data.socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Facebook size={24} />
                <span className="text-[10px] font-bold uppercase text-slate-400">Facebook</span>
              </a>
            )}
            {data.socialLinks.twitter && (
              <a 
                href={data.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 text-sky-500 hover:bg-sky-50 transition-colors"
              >
                <Twitter size={24} />
                <span className="text-[10px] font-bold uppercase text-slate-400">Twitter</span>
              </a>
            )}
            {data.socialLinks.youtube && (
              <a 
                href={data.socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 text-red-600 hover:bg-red-50 transition-colors"
              >
                <Youtube size={24} />
                <span className="text-[10px] font-bold uppercase text-slate-400">YouTube</span>
              </a>
            )}
         </div>
      </div>
    </div>
  );
};
