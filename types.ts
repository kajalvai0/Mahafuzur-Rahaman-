
export enum AppView {
  HOME = 'HOME',
  CHAT = 'CHAT',
  MANIFESTO = 'MANIFESTO',
  ISSUES = 'ISSUES',
  SERVICES = 'SERVICES',
  VOLUNTEER = 'VOLUNTEER',
  ADMIN = 'ADMIN',
  MP_PROFILE = 'MP_PROFILE',
  LOGIN = 'LOGIN'
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name?: string;
}

export interface DailyCampaignItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  location: string;
}

export interface ManifestoItem {
  id: string;
  title: string;
  description: string;
  color: string;
}

export interface CampaignData {
  candidateName: string;
  constituency: string;
  profileImage: string;
  logoImage: string;
  tagline: string;
  bio: string;
  achievements: string[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  dailyCampaigns: DailyCampaignItem[];
  manifesto: ManifestoItem[];
  aiInstruction: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
