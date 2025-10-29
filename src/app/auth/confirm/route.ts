//src/app/auth/confirm/route.ts
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = (searchParams.get('type') as EmailOtpType) ?? 'signup'
  const next = searchParams.get('next') ?? '/dashboard'

  if (!token_hash) {
    redirect('/auth/auth-code-error')
  }

  const supabase = await createClient()

  // Gọi verifyOtp với type: signup (rất quan trọng)
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash,
    type, // type = 'signup'
  })

  if (error) {
    console.error('Error verifying OTP:', error)
    redirect('/auth/auth-code-error')
  }

  // Nếu xác minh thành công => Supabase sẽ kích hoạt user
  // Và nếu session có sẵn => đăng nhập tự động
  if (data?.session) {
    redirect(next)
  }

  // Nếu vì lý do nào đó Supabase không trả session,
  // bạn có thể redirect người dùng về trang login
  redirect('/sign-in')
}
