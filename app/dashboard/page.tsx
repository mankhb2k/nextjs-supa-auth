"use client"

import { signOut } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

function Dashboard() {
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut()
        router.replace("/sign-in")
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        Dashboard - Protected route
        <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  )
}
export default Dashboard