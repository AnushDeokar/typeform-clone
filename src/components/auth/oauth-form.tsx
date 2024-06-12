"use client"

import * as React from "react"
import { useSignIn } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/types"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"

function Oauthform() {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)
  const { signIn, isLoaded: signInLoaded } = useSignIn()

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return null
    try {
      setIsLoading(provider)
      const res = await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button
      variant="outline"
      className="text-light flex rounded-sm"
      onClick={() => void oauthSignIn("oauth_google")}
      disabled={isLoading !== null}
    >
      <FcGoogle size={20} />{" "}
      <span className="flex grow justify-center">Login with Google</span>
    </Button>
  )
}

export default Oauthform
