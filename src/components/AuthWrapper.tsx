"use client"

import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useRouter } from "next/router"

export default function AuthWrapper({ children }) {
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated && !router.pathname.startsWith("/login")) {
            loginWithRedirect()
        }
    }, [isLoading, isAuthenticated, loginWithRedirect, router.pathname])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return children
}
