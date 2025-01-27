import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useRouter } from "next/router"

const AuthGuard = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect({
                appState: { returnTo: router.asPath },
            })
        }
    }, [isAuthenticated, isLoading, loginWithRedirect, router])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? children : null
}

export default AuthGuard
