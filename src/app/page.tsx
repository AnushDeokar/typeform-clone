import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

import MainHeaderComponent from "@/components/main/main-header"

export default async function Home() {
  const user = await currentUser()
  if (!user || !user.id) {
    redirect(`${window.location.origin}/signin`)
  }
  console.log("uuuux", user)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <MainHeaderComponent user={JSON.parse(JSON.stringify(user))} />
    </main>
  )
}
