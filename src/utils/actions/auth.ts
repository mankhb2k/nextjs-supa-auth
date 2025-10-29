'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// ⚙️ Hàm tạo client Supabase với cookie đồng bộ như middleware
async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options)
            } catch (err) {
              console.error('Set cookie failed:', err)
            }
          })
        },
      },
    }
  )
}

export async function signInWithEmail(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Sign-in error:', error.message)
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    console.error('Google sign-in error:', error.message)
    return { error: error.message }
  }

  redirect(data.url) // chuyển hướng sang trang Google login
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut(); // => Supabase tự xoá cookie
  redirect("/login")
}
