import { createClient } from '@supabase/supabase-js';
import { CampaignData } from '../types';

// Using the provided project info. 
// These values should ideally come from environment variables defined in vite.config.ts
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://tfisprkzkodixbsuxekd.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const LOCAL_STORAGE_KEY = 'mpsmart_campaign_data_fallback';

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 20) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

export const fetchCampaignData = async (): Promise<CampaignData | null> => {
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (supabase) {
    try {
      const fetchPromise = supabase
        .from('campaign_settings')
        .select('*')
        .eq('id', 1)
        .single();
        
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Supabase Timeout')), 3000)
      );

      const result: any = await Promise.race([fetchPromise, timeoutPromise]);
      const { data, error } = result;
      
      if (error) {
        console.warn("Supabase Fetch Error:", error.message);
      } else if (data) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        return data as CampaignData;
      }
    } catch (error) {
      console.warn("Supabase issue, using fallback data:", error);
    }
  }

  return localData ? JSON.parse(localData) : null;
};

export const saveCampaignData = async (newData: CampaignData) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  } catch (e) {
    console.error("Local storage sync failed:", e);
  }

  if (!supabase) return true;

  try {
    const { error } = await supabase
      .from('campaign_settings')
      .upsert({ id: 1, ...newData });
    
    return !error;
  } catch (error) {
    console.error("Critical error during Supabase save:", error);
    return false;
  }
};