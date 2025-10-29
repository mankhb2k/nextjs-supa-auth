'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Đăng xuất lỗi:', error.message)
      alert('Đăng xuất thất bại!')
      return
    }

    router.push('/sign-in')
    router.refresh() // làm mới lại session cookie trên SSR
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="w-full text-red-600 border-red-300 hover:bg-red-50"
    >
      Đăng xuất
    </Button>
  )
}
