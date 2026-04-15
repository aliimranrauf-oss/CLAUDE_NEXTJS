import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Template = {
  id: string
  template_id: string
  name: string
  category: string
  desktop_image: string
  mobile_image: string
  description: string
  created_at: string
  is_primary: boolean
}
