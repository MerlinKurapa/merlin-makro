import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qlmphykuggjqhcznbwgq.supabase.co"
const supabaseKey = "sb_publishable_OBu1w6AOE67N84ryTy0O6g_1SlsV21N"

export const supabase = createClient(supabaseUrl, supabaseKey)