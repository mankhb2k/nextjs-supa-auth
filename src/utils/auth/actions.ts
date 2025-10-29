'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Xử lý chức năng Đăng ký (Sign Up) bằng Email và Mật khẩu.
 * @param formData - Dữ liệu từ form Next.js (chứa email và password).
 */
export async function signUp(formData: FormData) {
  const origin = (await headers()).get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  if (!email || !password) {
    return redirect('/signup?error=Vui lòng nhập đầy đủ email và mật khẩu')
  }

  const supabase = await createClient()

  // Thử đăng ký người dùng mới
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Cấu hình URL chuyển hướng sau khi người dùng click vào link xác nhận trong email
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  })

  if (error) {
    console.error('Lỗi Đăng ký:', error.message)
    // Chuyển hướng về trang đăng ký với thông báo lỗi
    return redirect(`/signup?error=${error.message}`)
  }

  // Chuyển hướng về trang đăng ký với thông báo yêu cầu kiểm tra email
  return redirect('/signup?message=Vui lòng kiểm tra email để xác nhận tài khoản!')
}

/**
 * Xử lý chức năng Đăng nhập (Sign In) bằng Email và Mật khẩu.
 * @param formData - Dữ liệu từ form Next.js (chứa email và password).
 */
export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/sign-in?error=Vui lòng nhập đầy đủ email và mật khẩu')
  }

  const supabase = await createClient()

  // Thử đăng nhập người dùng
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Lỗi Đăng nhập:', error.message)
    // Chuyển hướng về trang đăng nhập với thông báo lỗi
    return redirect(`/sign-in?error=${error.message}`)
  }

  // Đăng nhập thành công, chuyển hướng đến route bảo vệ
  return redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
  return redirect('/sign-in')
}