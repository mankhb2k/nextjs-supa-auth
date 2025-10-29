'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

export default function GoogleSignInButton() {
  const handleSignIn = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Đăng nhập thất bại:', error.message)
      alert('Đăng nhập thất bại!')
    } else {
      // Supabase sẽ tự redirect đến trang Google
      console.log('Redirecting to Google OAuth:', data?.url)
    }
  }

  return (
    <Button
      onClick={handleSignIn}
      className="w-full bg-white text-black border flex items-center gap-2 hover:bg-gray-100"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Đăng nhập với Google
    </Button>
  )
}
