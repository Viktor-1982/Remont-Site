import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseReady = Boolean(SUPABASE_URL) && Boolean(SUPABASE_SERVICE_ROLE_KEY)

export const supabaseAdmin = supabaseReady
    ? createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
          auth: {
              autoRefreshToken: false,
              persistSession: false,
          },
      })
    : null

