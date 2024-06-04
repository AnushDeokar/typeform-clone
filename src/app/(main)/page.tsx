import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { FaPlus } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import FormTable from "@/components/main/form-table"
import MainDisplay from "@/components/main/main-display"
import MainHeaderComponent from "@/components/main/main-header"
import SearchBar from "@/components/main/search-bar"
import UpgradeBanner from "@/components/main/upgrade-banner"

export default async function Home() {
  const user = await currentUser()

  if (!user || !user.id) {
    redirect(`${window.location.origin}/signin`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <MainHeaderComponent user={JSON.parse(JSON.stringify(user))} />
      <UpgradeBanner />
      <MainDisplay userId={user?.id} />
    </main>
  )
}
