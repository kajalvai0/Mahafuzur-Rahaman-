
import { createClient } from '@supabase/supabase-js';
import { CampaignData } from '../types';

/**
 * Supabase configuration using provided project credentials.
 * We prioritize environment variables for security, but use the provided
 * keys as defaults for this specific project implementation.
 */
const SUPABASE_URL = (process.env as any)?.SUPABASE_URL || 'https://tfisprkzkodixbsuxekd.supabase.co';
const SUPABASE_ANON_KEY = (process.env as any)?.SUPABASE_ANON_KEY || 'sb_publishable_HzOjIOqG8nmGPkM0ugkwXA_';

const LOCAL_STORAGE_KEY = 'mpsmart_campaign_data_fallback';

// Initialize client only if credentials are available
export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

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
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        return data as CampaignData;
      }
    } catch (error) {
      console.warn("Supabase connection issue, using local fallback", error);
    }
  }

  return localData ? JSON.parse(localData) : null;
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
    const { error } = await supabase
      .from('campaign_settings')
      .upsert({ id: 1, ...newData });
    
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
