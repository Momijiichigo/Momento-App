import {createClient} from '@supabase/supabase-js'
import {createSignal} from 'solid-js'
const supabaseUrl = 'https://ipyizppumxxsixtqznld.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)


export const signUp = async (email: string, password: string) => await supabase.auth.signUp({email,password})

export const signIn = async (email: string, password: string) => await supabase.auth.signInWithPassword({email,password})


export const [user, setUser] = createSignal(await supabase.auth.getUser())
// { data: { user } } = await supabase.auth.getUser()

