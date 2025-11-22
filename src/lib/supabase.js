import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfxzsyqcdriojozxfwgt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmeHpzeXFjZHJpb2pvenhmd2d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzQxNzksImV4cCI6MjA3OTQxMDE3OX0.DJPZ7sV19w_4x5jFhoEVcpft-rPC6bnCJ_B80dayWV4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
