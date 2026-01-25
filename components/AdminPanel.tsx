import React, { useState } from 'react';
import { CampaignData, DailyCampaignItem, ManifestoItem } from '../types';
import { Save, Plus, Trash2, Layout, Image, FileText, Bot, Newspaper, MapPin, Upload, Facebook, Twitter, Youtube } from 'lucide-react';

interface AdminPanelProps {
  data: CampaignData;
  onUpdate: (newData: CampaignData) => void;
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ data, onUpdate, onBack }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'news' | 'manifesto' | 'ai'>('basic');
  const [formData, setFormData] = useState<CampaignData>(data);

  const handleSave = () => {
    onUpdate(formData);
    alert('সব তথ্য সফলভাবে আপডেট করা হয়েছে!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDailyCampaign = () => {
    const newItem: DailyCampaignItem = {
      id: Date.now().toString(),
      title: 'নতুন ক্যাম্পেইন শিরোনাম',
      date: 'আজ',
      location: 'নির্বাচনী এলাকা',
      description: 'বিস্তারিত এখানে লিখুন...',
      image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=800'
    };
    setFormData({ ...formData, dailyCampaigns: [newItem, ...formData.dailyCampaigns] });
  };

  const deleteDailyCampaign = (id: string) => {
    setFormData({ ...formData, dailyCampaigns: formData.dailyCampaigns.filter(n => n.id !== id) });
  };

  return (
    <div className="p-4 space-y-6 pb-24 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold text-slate-800">অ্যাডমিন প্যানেল</h2>
        <button onClick={handleSave} className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg shadow-emerald-200">
          <Save size={16} /> সেভ করুন
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 no-scrollbar border-b">
        <button onClick={() => setActiveTab('basic')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'basic' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}>
          <Layout size={16} /> সাধারণ তথ্য
        </button>
        <button onClick={() => setActiveTab('news')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'news' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}>
          <Newspaper size={16} /> ডেইলি ক্যাম্পেইন
        </button>
        <button onClick={() => setActiveTab('manifesto')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'manifesto' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}>
          <FileText size={16} /> ইশতেহার
        </button>
        <button onClick={() => setActiveTab('ai')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'ai' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}>
          <Bot size={16} /> এআই কনফিগ
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">প্রার্থীর নাম</label>
              <input type="text" value={formData.candidateName} onChange={e => setFormData({...formData, candidateName: e.target.value})} className="w-full p-3 bg-white border rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">নির্বাচনী এলাকা</label>
              <input type="text" value={formData.constituency} onChange={e => setFormData({...formData, constituency: e.target.value})} className="w-full p-3 bg-white border rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">স্লোগান</label>
              <input type="text" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} className="w-full p-3 bg-white border rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">সামাজিক যোগাযোগ মাধ্যম লিংক</label>
              <div className="flex items-center gap-3 bg-white p-3 border rounded-xl shadow-sm">
                 <Facebook size={18} className="text-blue-600" />
                 <input 
                    type="text" 
                    placeholder="Facebook URL" 
                    value={formData.socialLinks.facebook || ''} 
                    onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, facebook: e.target.value}})}
                    className="flex-1 text-xs outline-none"
                 />
              </div>
              <div className="flex items-center gap-3 bg-white p-3 border rounded-xl shadow-sm">
                 <Twitter size={18} className="text-sky-500" />
                 <input 
                    type="text" 
                    placeholder="Twitter URL" 
                    value={formData.socialLinks.twitter || ''} 
                    onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, twitter: e.target.value}})}
                    className="flex-1 text-xs outline-none"
                 />
              </div>
              <div className="flex items-center gap-3 bg-white p-3 border rounded-xl shadow-sm">
                 <Youtube size={18} className="text-red-600" />
                 <input 
                    type="text" 
                    placeholder="YouTube URL" 
                    value={formData.socialLinks.youtube || ''} 
                    onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, youtube: e.target.value}})}
                    className="flex-1 text-xs outline-none"
                 />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase">প্রোফাইল ইমেজ</label>
                    <div className="relative group">
                        <div className="w-full h-32 bg-slate-100 rounded-2xl border overflow-hidden flex items-center justify-center relative">
                            {formData.profileImage ? <img src={formData.profileImage} className="w-full h-full object-cover" /> : <Image className="text-slate-300" size={32} />}
                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                                <Upload size={24} />
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (b64) => setFormData({...formData, profileImage: b64}))} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase">লোগো</label>
                    <div className="relative group">
                        <div className="w-full h-32 bg-slate-100 rounded-2xl border overflow-hidden flex items-center justify-center relative">
                            {formData.logoImage ? <img src={formData.logoImage} className="w-full h-full object-cover" /> : <Image className="text-slate-300" size={32} />}
                            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                                <Upload size={24} />
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (b64) => setFormData({...formData, logoImage: b64}))} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-4">
            <button onClick={addDailyCampaign} className="w-full py-3 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-emerald-50 transition-colors">
              <Plus size={18} /> নতুন নিউজ যোগ করুন
            </button>
            {formData.dailyCampaigns.map((item, idx) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border relative shadow-sm space-y-4">
                <button onClick={() => deleteDailyCampaign(item.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-2 z-10">
                  <Trash2 size={16} />
                </button>
                
                <div className="flex gap-4 items-start">
                    <div className="flex flex-col gap-2 shrink-0">
                        <div className="w-24 h-24 bg-slate-50 rounded-xl border relative overflow-hidden group">
                             {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <Image className="text-slate-200" size={24} />}
                             <label className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                                <Upload size={16} />
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (b64) => {
                                    const newNews = [...formData.dailyCampaigns];
                                    newNews[idx].image = b64;
                                    setFormData({...formData, dailyCampaigns: newNews});
                                })} />
                             </label>
                        </div>
                        {/* More prominent upload button */}
                        <label className="flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold py-1.5 rounded-lg cursor-pointer transition-colors text-slate-600 border border-slate-200">
                           <Upload size={12} /> ছবি আপলোড
                           <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (b64) => {
                                const newNews = [...formData.dailyCampaigns];
                                newNews[idx].image = b64;
                                setFormData({...formData, dailyCampaigns: newNews});
                            })} />
                        </label>
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-slate-400 uppercase">শিরোনাম</label>
                                <input type="text" placeholder="শিরোনাম" value={item.title} onChange={e => {
                                    const newNews = [...formData.dailyCampaigns];
                                    newNews[idx].title = e.target.value;
                                    setFormData({...formData, dailyCampaigns: newNews});
                                }} className="w-full text-xs font-bold border-b focus:outline-none py-1 focus:border-emerald-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-slate-400 uppercase">তারিখ</label>
                                <input type="text" placeholder="তারিখ" value={item.date} onChange={e => {
                                    const newNews = [...formData.dailyCampaigns];
                                    newNews[idx].date = e.target.value;
                                    setFormData({...formData, dailyCampaigns: newNews});
                                }} className="w-full text-xs border-b focus:outline-none py-1 focus:border-emerald-500" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-400 uppercase">স্থান</label>
                            <input type="text" placeholder="স্থান" value={item.location} onChange={e => {
                                const newNews = [...formData.dailyCampaigns];
                                newNews[idx].location = e.target.value;
                                setFormData({...formData, dailyCampaigns: newNews});
                            }} className="w-full text-xs border-b focus:outline-none py-1 focus:border-emerald-500" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase mb-1 block">বিস্তারিত বর্ণনা</label>
                    <textarea value={item.description} placeholder="বিস্তারিত এখানে লিখুন..." onChange={e => {
                        const newNews = [...formData.dailyCampaigns];
                        newNews[idx].description = e.target.value;
                        setFormData({...formData, dailyCampaigns: newNews});
                    }} className="w-full text-xs text-slate-500 h-20 resize-none focus:outline-none border rounded-lg p-2 focus:ring-1 focus:ring-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'manifesto' && (
          <div className="space-y-4">
            {formData.manifesto.map((item, idx) => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-l-4 shadow-sm" style={{ borderLeftColor: item.color }}>
                <div className="space-y-2">
                  <input type="text" value={item.title} onChange={e => {
                    const newMan = [...formData.manifesto];
                    newMan[idx].title = e.target.value;
                    setFormData({...formData, manifesto: newMan});
                  }} className="w-full font-bold text-sm border-b pb-1 focus:outline-none" />
                  <textarea value={item.description} onChange={e => {
                    const newMan = [...formData.manifesto];
                    newMan[idx].description = e.target.value;
                    setFormData({...formData, manifesto: newMan});
                  }} className="w-full text-xs text-slate-500 h-16 resize-none focus:outline-none" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-700 leading-relaxed mb-4">
              <Bot size={16} className="inline mr-2" />
              স্মার্ট প্রতিনিধির (AI) ব্যক্তিত্ব এবং জ্ঞান এখানে কন্ট্রোল করুন।
            </div>
            <textarea 
              value={formData.aiInstruction} 
              onChange={e => setFormData({...formData, aiInstruction: e.target.value})}
              className="w-full h-80 p-4 bg-white border rounded-xl text-sm font-mono leading-relaxed focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="System Instruction..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
