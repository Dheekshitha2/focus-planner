import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing SU{ABASE_URL or SUPABASE_SERVICE_ROLE_KEY in server/.env");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
