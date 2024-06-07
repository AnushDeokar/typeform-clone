import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

import { Icons } from "@/components/ui/icons"

export default function SSOCallbackPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Icons.spinner className="size-12 animate-spin" aria-hidden="true" />
      <AuthenticateWithRedirectCallback />
    </div>
  )
}
