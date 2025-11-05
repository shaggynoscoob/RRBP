// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wyuvwlfnatdvprxpfmth.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dXZ3bGZuYXRkdnByeHBmbXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMDI4NjYsImV4cCI6MjA3Nzg3ODg2Nn0.fH-hm1L63mSYB4un6SpdvcdGibvv39QddD1csV1w9p0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);