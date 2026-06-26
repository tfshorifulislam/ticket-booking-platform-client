import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: 'https://ticket-booking-client.vercel.app',
    // baseURL: 'http://localhost:3000',

    plugins: [
        jwtClient()
    ]
})

export const { signIn, signUp, useSession, signOut } = createAuthClient()