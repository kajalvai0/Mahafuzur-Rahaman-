
import { createClient } from '@supabase/supabase-js';
import { CampaignData } from '../types';

// Accessing environment variables directly from process.env as per standard deployment practices
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const LOCAL_STORAGE_KEY = 'mpsmart_campaign_data_fallback';

// Initialize client only if valid credentials are provided
const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
export const supabase = isSupabaseConfigured ? createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!) : null;

export const fetchCampaignData = async (): Promise<CampaignData | null> => {
  // Try local storage first as it's the fastest and works offline
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('campaign_settings')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (error) {
        console.warn("Supabase error, using local fallback:", error.message);
      } else if (data) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        return data as CampaignData;
      }
    } catch (error) {
      console.warn("Supabase fetch exception, attempting local fallback", error);
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
    console.error("Local storage save failed:", e);
  }

  if (!isSupabaseConfigured || !supabase) {
    console.info("Supabase not configured, data saved locally only.");
    return true;
  }

  try {
    // We explicitly target ID 1 to maintain a single configuration row
    const { error } = await supabase
      .from('campaign_settings')
      .upsert({ id: 1, ...newData });
    
    if (error) {
      console.error(`Supabase save failed: ${error.message}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Supabase save operation exception:", error);
    return false;
  }
};
