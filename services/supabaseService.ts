import { createClient } from '@supabase/supabase-js';
import { CampaignData, ManifestoItem } from '../types';

/**
 * Supabase configuration using provided project credentials.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const LOCAL_STORAGE_KEY = 'mpsmart_campaign_data_fallback';

// Initialize client only if credentials are available
export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

// Default campaign data
const defaultCampaignData: CampaignData = {
  candidateName: 'মাহফুজুর রহমান',
  constituency: 'ঢাকা-১',
  profileImage: '',
  logoImage: '',
  tagline: 'উন্নয়নের পথে এগিয়ে যাই',
  bio: '',
  achievements: [],
  socialLinks: { facebook: '', twitter: '', youtube: '' },
  dailyCampaigns: [],
  manifesto: [],
  aiInstruction: ''
};

// Map database row to CampaignData type
const mapDbToCampaignData = (dbData: any): CampaignData => {
  return {
    candidateName: dbData.candidate_name || defaultCampaignData.candidateName,
    constituency: dbData.constituency_name || defaultCampaignData.constituency,
    profileImage: dbData.profile_image || '',
    logoImage: dbData.logo_image || '',
    tagline: dbData.tagline || defaultCampaignData.tagline,
    bio: dbData.bio || '',
    achievements: dbData.achievements || [],
    socialLinks: dbData.social_links || { facebook: '', twitter: '', youtube: '' },
    dailyCampaigns: dbData.daily_campaigns || [],
    manifesto: dbData.manifesto || [],
    aiInstruction: dbData.ai_instruction || ''
  };
};

// Map CampaignData to database columns
const mapCampaignDataToDb = (data: CampaignData) => {
  return {
    id: 1,
    candidate_name: data.candidateName,
    constituency_name: data.constituency,
    profile_image: data.profileImage,
    logo_image: data.logoImage,
    tagline: data.tagline,
    bio: data.bio,
    achievements: data.achievements,
    social_links: data.socialLinks,
    daily_campaigns: data.dailyCampaigns,
    manifesto: data.manifesto,
    ai_instruction: data.aiInstruction,
    updated_at: new Date().toISOString()
  };
};

export const fetchCampaignData = async (): Promise<CampaignData | null> => {
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('campaign_settings')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (error) {
        console.warn("Supabase fetch warning, using local fallback:", error.message);
      } else if (data) {
        const campaignData = mapDbToCampaignData(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(campaignData));
        return campaignData;
      }
    } catch (error) {
      console.warn("Supabase connection issue, using local fallback", error);
    }
  }

  return localData ? JSON.parse(localData) : defaultCampaignData;
};

export const saveCampaignData = async (newData: CampaignData) => {
  // Always persist locally for immediate feedback and offline support
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  } catch (e) {
    console.error("Local storage sync failed:", e);
  }

  if (!supabase) {
    console.warn("Supabase client not initialized. Changes saved locally only.");
    return true;
  }

  try {
    const dbData = mapCampaignDataToDb(newData);
    const { error } = await supabase
      .from('campaign_settings')
      .upsert(dbData);
    
    if (error) {
      console.error(`Supabase persistence failed: ${error.message}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Critical error during Supabase save:", error);
    return false;
  }
};

// Volunteer functions
export const submitVolunteer = async (volunteer: {
  name: string;
  phone: string;
  email?: string;
  area?: string;
  skills?: string;
}) => {
  if (!supabase) return false;
  
  const { error } = await supabase.from('volunteers').insert(volunteer);
  return !error;
};

export const fetchVolunteers = async () => {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('volunteers')
    .select('*')
    .order('created_at', { ascending: false });
  
  return error ? [] : data;
};

// Issue functions
export const submitIssue = async (issue: {
  reporter_name: string;
  reporter_phone: string;
  category: string;
  description: string;
  location?: string;
}) => {
  if (!supabase) return false;
  
  const { error } = await supabase.from('issues').insert(issue);
  return !error;
};

export const fetchIssues = async () => {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('issues')
    .select('*')
    .order('created_at', { ascending: false });
  
  return error ? [] : data;
};
