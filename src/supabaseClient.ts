import {createClient} from '@supabase/supabase-js'
const supabaseUrl = 'https://ipyizppumxxsixtqznld.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)


export const signUp = async (email: string, password: string) => await supabase.auth.signUp({email,password})

