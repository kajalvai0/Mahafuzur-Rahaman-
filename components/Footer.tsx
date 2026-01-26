
import React from 'react';
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin, Scale, Heart } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  setView: (view: AppView) => void;
  candidateName: string;
  constituency: string;
}

export const Footer: React.FC<FooterProps> = ({ setView, candidateName, constituency }) => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 py-12 px-6 pb-28 mt-8 border-t border-emerald-900/50">
      <div className="space-y-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-900 shadow-xl overflow-hidden">
                <Scale size={28} />
             </div>
             <div>
                <h3 className="font-bold text-lg text-white leading-tight">{candidateName}</h3>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{constituency}</p>
             </div>
          </div>
          <p className="text-sm text-emerald-200/70 leading-relaxed font-medium italic">
            "সুখী, সমৃদ্ধ ও ইনসাফভিত্তিক সমাজ বিনির্মাণে আমাদের অঙ্গীকার। ২০২৬-এর নির্বাচনী অভিযাত্রায় আপনার সমর্থন কাম্য।"
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-emerald-800 pb-2">দ্রুত মেনু</h4>
            <ul className="space-y-3">
              <li><button onClick={() => setView(AppView.HOME)} className="text-sm hover:text-white transition-colors">হোম পেজ</button></li>
              <li><button onClick={() => setView(AppView.MANIFESTO)} className="text-sm hover:text-white transition-colors">নির্বাচনী ইশতেহার</button></li>
              <li><button onClick={() => setView(AppView.SERVICES)} className="text-sm hover:text-white transition-colors">জনসেবা মডিউল</button></li>
              <li><button onClick={() => setView(AppView.VOLUNTEER)} className="text-sm hover:text-white transition-colors">স্বেচ্ছাসেবক হোন</button></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-emerald-800 pb-2">সহায়তা</h4>
            <ul className="space-y-3">
              <li><button onClick={() => setView(AppView.MP_PROFILE)} className="text-sm hover:text-white transition-colors">প্রার্থীর প্রোফাইল</button></li>
              <li><button onClick={() => setView(AppView.ISSUES)} className="text-sm hover:text-white transition-colors">সমস্যা জানান</button></li>
              <li><button className="text-sm hover:text-white transition-colors">প্রাইভেসি পলিসি</button></li>
              <li><button onClick={() => setView(AppView.CHAT)} className="text-sm hover:text-white transition-colors">এআই হেল্পলাইন</button></li>
            </ul>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-emerald-800 pb-2">যোগাযোগ করুন</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-emerald-500" />
                <span>বদলগাছি ও মহাদেবপুর, নওগাঁ</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-emerald-500" />
                <span>+৮৮০১৭১২-৩৪৫৬৭৮</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-emerald-500" />
                <span>info@mpsmart.com</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors text-white">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-emerald-900 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-900/40 px-4 py-2 rounded-full">
            <Heart size={14} className="fill-current" /> ভালোবাসায় নওগাঁ-৩
          </div>
          <p className="text-[10px] text-emerald-600 font-medium">
            &copy; ২০২৪-২০২৬ | মাওলানা মাহফুজুর রহমান ডিজিটাল প্রচার উইং। <br/>
            সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};
