// src/services/supabase.js

import { createClient } from '@supabase/supabase-js';
//create .env then ignore
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
);
