
import { createClient } from '@supabase/supabase-js';
import { CampaignData } from '../types';

// Replace these with your actual Supabase project details
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';

const LOCAL_STORAGE_KEY = 'mpsmart_campaign_data_fallback';

// Initialize client only if valid credentials are provided
const isSupabaseConfigured = SUPABASE_URL !== 'https://your-project.supabase.co' && SUPABASE_ANON_KEY !== 'your-anon-key';
export const supabase = isSupabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

export const fetchCampaignData = async (): Promise<CampaignData | null> => {
  // Try local storage first as it's the fastest and works offline
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('campaign_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      
      // Sync local storage with remote data
      if (data) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        return data as CampaignData;
      }
    } catch (error) {
      console.warn("Supabase fetch failed, attempting local fallback", error);
    }
  }

  // Fallback to local storage if remote fails or isn't configured
  return localData ? JSON.parse(localData) : null;
};

export const saveCampaignData = async (newData: CampaignData) => {
  // Always save to local storage first for persistence in the current browser
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  } catch (e) {
    console.error("Local storage save failed (possibly due to image size limits):", e);
  }

  if (!isSupabaseConfigured || !supabase) {
    console.info("Supabase not configured, data saved locally only.");
    return true;
  }

  try {
    const { error } = await supabase
      .from('campaign_settings')
      .upsert({ id: 1, ...newData });
    
    if (error) {
      // Stringify error for better debugging output
      const errorMsg = typeof error === 'object' ? JSON.stringify(error, null, 2) : error;
      console.error(`Supabase save failed:\n${errorMsg}`);
      throw error;
    }
    return true;
  } catch (error) {
    console.error("Supabase save operation exception:", error);
    return false;
  }
};
