"use client"

import { signOut } from "@/utils/auth/actions"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from "react"

function Dashboard() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }

        getUser()
    }, [])

    const handleSignOut = async () => {
        await signOut()
        router.replace("/sign-in")
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">
                Welcome, {user?.email || 'Loading...'}
            </h1>
            <p>Dashboard - Protected route</p>
            <Button onClick={handleSignOut}>Sign out</Button>
        </div>
    )
}

export default Dashboard