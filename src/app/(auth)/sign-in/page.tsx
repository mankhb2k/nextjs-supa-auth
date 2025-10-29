'use client'

import GoogleSignInButton from '@/components/auth/google-login-btn'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Đăng nhập</h1>
          <p className="text-gray-500 text-sm">
            Chào mừng bạn quay lại! Vui lòng đăng nhập để tiếp tục.
          </p>
        </div>

        <div className="mt-6">
          <GoogleSignInButton />
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-400">hoặc</span>
          </div>
        </div>

        <form action="#" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black p-2"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black p-2"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
}
