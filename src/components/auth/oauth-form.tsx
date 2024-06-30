"use client"

import * as React from "react"
import { useSignIn } from "@clerk/nextjs"
import { type OAuthStrategy } from "@clerk/types"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"

function Oauthform() {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)
  const { signIn, isLoaded: signInLoaded, isLoaded } = useSignIn()

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

  if (!isLoaded) {
    // Add logic to handle loading state
    return null
  }
  return (
    <>
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-black" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="text-secondary-muted bg-background px-2">Or</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="text-light flex rounded-sm"
        onClick={() => void oauthSignIn("oauth_google")}
        disabled={isLoading !== null}
      >
        <FcGoogle size={20} />{" "}
        <span className="flex grow justify-center">Login with Google</span>
      </Button>
    </>
  )
}

export default Oauthform
