// src/app/signup/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signUp } from '@/utils/auth/actions'
// KHÔNG hiển thị nút Google trên trang Đăng ký

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { message?: string; error?: string }
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[380px]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Tạo tài khoản mới</CardTitle>
          <CardDescription>
            Vui lòng nhập email và mật khẩu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" action={signUp}>
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
              Đăng ký
            </Button>
            
            <p className="text-center text-sm text-gray-500 mt-2">
                Đã có tài khoản?{' '}
                <Link href="/login" className="underline hover:text-primary">
                    Đăng nhập
                </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}