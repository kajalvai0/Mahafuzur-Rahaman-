import React, { useState } from 'react';
import { LogIn, Shield, User, ArrowRight, Lock } from 'lucide-react';
import { User as UserType } from '../types';

interface LoginProps {
  onLogin: (user: UserType) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication logic
    if (isAdminMode) {
      if (password === '1234') {
        onLogin({ id: 'admin-1', email: 'admin@mpsmart.com', role: 'admin', name: 'অ্যাডমিনিস্ট্রেটর' });
      } else {
        alert('ভুল অ্যাডমিন পিন!');
      }
    } else {
      onLogin({ id: 'user-1', email: email || 'user@example.com', role: 'user', name: 'সাধারণ ব্যবহারকারী' });
    }
  };

  return (
    <div className="p-6 h-full flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-8">
         <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            {isAdminMode ? <Shield size={32} /> : <User size={32} />}
         </div>
         <h2 className="text-2xl font-bold text-slate-800">
            {isAdminMode ? 'অ্যাডমিন লগ ইন' : 'স্বাগতম জানাই'}
         </h2>
         <p className="text-sm text-slate-500 mt-1">
            {isAdminMode ? 'আপনার সিকিউরিটি পিন দিয়ে প্রবেশ করুন' : 'আপনার একাউন্টে প্রবেশ করুন'}
         </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {!isAdminMode && (
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ইমেইল ঠিকানা</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all pl-12" 
              />
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
            {isAdminMode ? 'অ্যাডমিন পিন' : 'পাসওয়ার্ড'}
          </label>
          <div className="relative">
            <input 
              type={isAdminMode ? "password" : "password"} 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={isAdminMode ? "••••" : "••••••••"}
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all pl-12" 
            />
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-emerald-800 active:scale-95 transition-all flex items-center justify-center gap-2 mt-6"
        >
          প্রবেশ করুন <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setIsAdminMode(!isAdminMode)}
          className="text-emerald-700 text-sm font-bold flex items-center justify-center gap-2 mx-auto hover:underline"
        >
          {isAdminMode ? <User size={14} /> : <Shield size={14} />}
          {isAdminMode ? 'ব্যবহারকারী হিসেবে লগইন করুন' : 'অ্যাডমিন হিসেবে লগইন করুন'}
        </button>
      </div>
    </div>
  );
};
