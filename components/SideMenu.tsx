
import React from 'react';
import { Home, User, LogIn, LogOut, Shield, ChevronRight, X, Heart } from 'lucide-react';
import { AppView, User as UserType } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (view: AppView) => void;
  currentUser: UserType | null;
  onLogout: () => void;
  candidateName: string;
  profileImage: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({ 
  isOpen, 
  onClose, 
  setView, 
  currentUser, 
  onLogout,
  candidateName,
  profileImage
}) => {
  const menuItems = [
    { label: 'হোম পেজ', view: AppView.HOME, icon: Home },
    { label: 'এমপি প্রোফাইল', view: AppView.MP_PROFILE, icon: User },
    { label: 'জনসেবা মডিউল', view: AppView.SERVICES, icon: Heart },
  ];

  const handleNav = (view: AppView) => {
    setView(view);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-[60] side-menu-overlay transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-[70] shadow-2xl transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="election-gradient p-8 text-white relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full">
              <X size={20} />
            </button>
            <div className="w-16 h-16 rounded-2xl bg-white p-1 mb-4 shadow-lg overflow-hidden">
               <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-xl" />
            </div>
            <h3 className="font-bold text-lg">{candidateName}</h3>
            <p className="text-xs text-emerald-100 opacity-80">নওগাঁ-৩ নির্বাচনী পোর্টাল</p>
          </div>

          {/* Nav Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 py-2">প্রধান মেনু</p>
            {menuItems.map((item) => (
              <button 
                key={item.view}
                onClick={() => handleNav(item.view)}
                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-emerald-50 text-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-emerald-600 group-hover:scale-110 transition-transform"><item.icon size={20} /></div>
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}

            {currentUser?.role === 'admin' && (
              <>
                <div className="h-[1px] bg-slate-100 my-4 mx-4"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 py-2">অ্যাডমিন কন্ট্রোল</p>
                <button 
                  onClick={() => handleNav(AppView.ADMIN)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white shadow-lg active:scale-95 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Shield size={20} className="text-emerald-400" />
                    <span className="font-bold text-sm">অ্যাডমিন প্যানেল</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50" />
                </button>
              </>
            )}
          </div>

          {/* Footer / Auth */}
          <div className="p-4 border-t border-slate-100">
            {currentUser ? (
              <button 
                onClick={() => { onLogout(); onClose(); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-600 hover:bg-red-50 transition-colors font-bold text-sm"
              >
                <LogOut size={20} /> লগ আউট
              </button>
            ) : (
              <button 
                onClick={() => handleNav(AppView.LOGIN)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-emerald-700 hover:bg-emerald-50 transition-colors font-bold text-sm"
              >
                <LogIn size={20} /> লগ ইন করুন
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
