// src/services/supabase.js

import { createClient } from '@supabase/supabase-js';
//create .env
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);
