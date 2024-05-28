import React from "react"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"
import SignupForm from "@/components/auth/signup-form"

function page() {
  return (
    <main className="text-dark flex min-h-screen flex-col items-center justify-center gap-2">
      <div className="text-secondary-muted fixed right-4 top-1 text-sm">
        Already have an account yet? &nbsp;{" "}
        <Button
          className="text-light h-8 rounded-none border border-black px-2 text-[12px] text-secondary-foreground"
          variant="outline"
        >
          <Link href="/signin">Log in</Link>
        </Button>
      </div>
      <h1 className="text-[28px] font-semibold">Typeform</h1>
      <p className="mt-8 max-w-[400px] text-center text-xl">
        Get better data with conversational forms, surveys, quizzes & more.
      </p>
      <div className="flex w-72 flex-col gap-4 p-4">
        <SignupForm />
      </div>
    </main>
  )
}

export default page
