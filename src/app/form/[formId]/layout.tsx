import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

import FormNavbar from "@/components/form/form-navbar"

async function FormPageLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  if (!user || !user.id) {
    redirect(`${window.location.origin}/signin`)
  }
  return (
    <main className="flex min-h-screen flex-col items-center px-4">
      <FormNavbar user={JSON.parse(JSON.stringify(user))} />
      {children}
    </main>
  )
}

export default FormPageLayout
