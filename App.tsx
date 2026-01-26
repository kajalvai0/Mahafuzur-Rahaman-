import React, { useState, useEffect } from 'react';
import { TopBar, BottomNav } from './components/Navigation';
import { Hero } from './components/Hero';
import { ChatInterface } from './components/ChatInterface';
import { Manifesto } from './components/Manifesto';
import { IssueReporter } from './components/IssueReporter';
import { Services, VolunteerForm } from './components/Services';
import { AdminPanel } from './components/AdminPanel';
import { SideMenu } from './components/SideMenu';
import { Login } from './components/Login';
import { MPProfile } from './components/MPProfile';
import { Footer } from './components/Footer';
import { AppView, CampaignData, User } from './types';
import { fetchCampaignData, saveCampaignData } from './services/supabaseService';

const DEFAULT_CAMPAIGN_DATA: CampaignData = {
  candidateName: "মাওলানা মাহফুজুর রহমান",
  constituency: "নওগাঁ-৩ (বদলগাছি ও মহাদেবপুর)",
  profileImage: "https://raw.githubusercontent.com/mdmahmuduzzaman/maulana-mahfuzur-rahman/main/maulana-mahfuzur-rahman.jpg",
  logoImage: "https://raw.githubusercontent.com/mdmahmuduzzaman/maulana-mahfuzur-rahman/main/maulana-mahfuzur-rahman.jpg",
  tagline: "ইনসাফ কায়েমে আপসহীন নেতৃত্ব",
  bio: "মাওলানা মাহফুজুর রহমান নওগাঁ-৩ আসনের একজন নিবেদিত প্রাণ। তিনি দীর্ঘদিন ধরে এলাকার ধর্মীয় ও সামাজিক উন্নয়নে কাজ করে যাচ্ছেন। বাংলাদেশ জামায়াতে ইসলামীর আদর্শে উদ্বুদ্ধ হয়ে তিনি একটি সুখী, সমৃদ্ধ ও ইনসাফভিত্তিক সমাজ বিনির্মাণে অঙ্গীকারবদ্ধ।",
  achievements: [
    "এলাকার ৫০টি মসজিদ ও মাদরাসার আধুনিকায়ন।",
    "করোনা কালীন সময়ে ১০০০ পরিবারকে খাদ্য সহায়তা।",
    "বদলগাছি ডিজিটাল স্কিল ট্রেনিং সেন্টারের উদ্বোধন।",
    "মহাদেবপুর নদী শাসন ও বাঁধ নির্মাণে বিশেষ ভূমিকা।"
  ],
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com"
  },
  aiInstruction: `আপনি মাওলানা মাহফুজুর রহমানের ডিজিটাল প্রতিনিধি (AI Chatbot)। আপনার উদ্দেশ্য প্রার্থীর ভিশন এবং বাংলাদেশ জামায়াতে ইসলামীর নির্বাচনী ইশতেহার সম্পর্কে জানানো। আপনার কথা হবে অত্যন্ত বিনয়ী, যুক্তিপূর্ণ এবং ইসলামিক মূল্যবোধ সম্পন্ন। ২০২৬ সালের নির্বাচনকে সামনে রেখে আপনার কার্যক্রম পরিচালিত হচ্ছে।`,
  dailyCampaigns: [
    { 
      id: '1', 
      title: 'বিশাল জনসভা - মহাদেবপুর উপজেলা সদর', 
      date: '২০ জানুয়ারি ২০২৬', 
      location: 'মহাদেবপুর পাবলিক হল মাঠ', 
      description: 'হাজার হাজার তৌহিদী জনতার উপস্থিতিতে ইনসাফ কায়েমের শপথ এবং নির্বাচনী দিকনির্দেশনা প্রদান করা হয়।', 
      image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=1200' 
    }
  ],
  manifesto: [
    { id: '1', title: "ইনসাফ কায়েম ও সুশাসন", color: "#059669", description: "আইনের শাসন প্রতিষ্ঠা এবং প্রতিটি নাগরিকের জান-মালের নিরাপত্তা নিশ্চিত করা।" },
    { id: '2', title: "দুর্নীতিমুক্ত বাংলাদেশ", color: "#047857", description: "রাষ্ট্রের সকল স্তরে স্বচ্ছতা ও জবাবদিহিতা নিশ্চিত করে দুর্নীতি সমূলে উৎপাটন।" }
  ]
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [campaignData, setCampaignData] = useState<CampaignData>(DEFAULT_CAMPAIGN_DATA);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCampaignData();
        if (data) {
          setCampaignData(data);
        }
      } catch (e) {
        console.error("Initial load issue, using defaults:", e);
      } finally {
        setIsDataLoaded(true);
      }
      
      const savedUser = localStorage.getItem('mpsmart_user');
      if (savedUser) {
        try {
          setCurrentUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem('mpsmart_user');
        }
      }
    };
    load();
  }, []);

  const handleUpdateData = async (newData: CampaignData) => {
    setCampaignData(newData);
    const success = await saveCampaignData(newData);
    if (!success) {
      alert('সতর্কতা: সার্ভারে ডেটা সেভ করা সম্ভব হয়নি, তবে আপনার ব্রাউজারে এটি সংরক্ষিত আছে।');
    }
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('mpsmart_user', JSON.stringify(user));
    setCurrentView(AppView.HOME);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mpsmart_user');
    setCurrentView(AppView.HOME);
  };

  if (!isDataLoaded) {
    return (
      <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-emerald-900 font-bold animate-pulse">লোড হচ্ছে...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME: return <Hero setView={setCurrentView} data={campaignData} />;
      case AppView.CHAT: return <ChatInterface instruction={campaignData.aiInstruction} />;
      case AppView.MANIFESTO: return <Manifesto data={campaignData.manifesto} />;
      case AppView.ISSUES: return <IssueReporter />;
      case AppView.SERVICES: return <Services setView={setCurrentView} />;
      case AppView.VOLUNTEER: return <VolunteerForm />;
      case AppView.MP_PROFILE: return <MPProfile data={campaignData} />;
      case AppView.LOGIN: return <Login onLogin={handleLogin} />;
      case AppView.ADMIN:
        return currentUser?.role === 'admin' 
          ? <AdminPanel data={campaignData} onUpdate={handleUpdateData} onBack={() => setCurrentView(AppView.HOME)} />
          : <Hero setView={setCurrentView} data={campaignData} />;
      default: return <Hero setView={setCurrentView} data={campaignData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center font-sans antialiased overflow-x-hidden p-0 sm:p-4">
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        setView={setCurrentView}
        currentUser={currentUser}
        onLogout={handleLogout}
        candidateName={campaignData.candidateName}
        profileImage={campaignData.profileImage}
      />

      <div className="w-full max-w-[440px] h-screen sm:h-[90vh] bg-slate-100 shadow-2xl sm:rounded-[40px] overflow-hidden flex flex-col relative border-0 sm:border-[8px] border-slate-400">
        <TopBar 
          logoImage={campaignData.logoImage} 
          title={campaignData.candidateName}
          onMenuClick={() => setIsMenuOpen(true)} 
        />
        <main className="flex-1 overflow-y-auto bg-slate-200 no-scrollbar relative">
          {renderContent()}
          {currentView !== AppView.CHAT && (
            <Footer setView={setCurrentView} candidateName={campaignData.candidateName} constituency={campaignData.constituency} />
          )}
        </main>
        <BottomNav currentView={currentView} setView={setCurrentView} />
      </div>
      
      <div className="hidden lg:block fixed left-10 top-1/2 -translate-y-1/2 max-w-xs space-y-4">
        <h1 className="text-4xl font-extrabold text-emerald-900 leading-tight">জনতার মাহফুজ ২০২৬</h1>
        <p className="text-slate-700">বাংলাদেশ জামায়াতে ইসলামী মনোনীত প্রার্থীর ডিজিটাল নির্বাচনী পোর্টাল।</p>
      </div>
    </div>
  );
};

export default App;