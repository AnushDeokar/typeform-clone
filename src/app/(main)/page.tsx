import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

import { getAllWorkspaces } from "@/lib/actions/workspace"
import MainDisplay from "@/components/main/main-display"
import MainHeaderComponent from "@/components/main/main-header"
import UpgradeBanner from "@/components/main/upgrade-banner"

export default async function Home() {
  const user = await currentUser()
  if (!user || !user.id) {
    redirect(`${window.location.origin}/signin`)
  }

  const workspaces = await getAllWorkspaces(user?.id)

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <MainHeaderComponent user={JSON.parse(JSON.stringify(user))} />
      <UpgradeBanner />
      <MainDisplay userId={user?.id} workspaces={workspaces} />
    </main>
  )
}
