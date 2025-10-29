// src/app/login/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signIn } from '@/utils/auth/actions'
import GoogleSignInButton from '@/components/auth/google-login-btn'

export default function SignInPage({
  searchParams,
}: {
  searchParams: { message?: string; error?: string }
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[380px]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Đăng nhập tài khoản</CardTitle>
          <CardDescription>
            Sử dụng email/mật khẩu hoặc đăng nhập với Google.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Nút Đăng nhập với Google */}
            <GoogleSignInButton />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Hoặc tiếp tục với</span>
              </div>
            </div>

            {/* Form Đăng nhập Email/Mật khẩu */}
            <form className="grid gap-4" action={signIn}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="email@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              
              {/* Hiển thị thông báo lỗi/thành công */}
              {searchParams.error && (
                <p className="text-sm font-medium text-red-600 mt-2">{searchParams.error}</p>
              )}
              {searchParams.message && (
                <p className="text-sm font-medium text-green-600 mt-2">{searchParams.message}</p>
              )}

              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-2">
                Chưa có tài khoản?{' '}
                <Link href="/sign-up" className="underline hover:text-primary">
                    Đăng ký ngay
                </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}