import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import ForgotPasswordForm from "@/components/auth/forgot-password-form"
import GithubLink from "@/components/github-link"

function ForgotPasswordPage() {
  return (
    <main className="text-dark flex min-h-screen flex-col items-center gap-2 py-16">
      <div className="text-secondary-muted fixed right-4 top-1 text-sm">
        Don&apos;t have an account yet? &nbsp;{" "}
        <Button
          className="text-light h-8 rounded-none border border-black px-2 text-[12px] text-secondary-foreground"
          variant="outline"
        >
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
      <h1 className="text-[28px] font-semibold">Typeform</h1>
      <p className="mt-8 text-xl">Forgot Password?</p>
      <div className="flex w-72 flex-col gap-4 p-4">
        <ForgotPasswordForm />
      </div>
      <GithubLink />
    </main>
  )
}

export default ForgotPasswordPage
