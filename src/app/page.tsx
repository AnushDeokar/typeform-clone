import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

import { Button } from "@/components/ui/button"
import FormTable from "@/components/main/form-table"
import MainHeaderComponent from "@/components/main/main-header"
import ManageWorkspace from "@/components/main/manage-workspace"
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
      <div className="mt-2 flex w-full grow gap-1 text-[14px]">
        <div className="flex w-64 flex-col gap-1 text-secgray">
          <div className="rounded-ss-lg bg-subtle px-4 py-2">
            <Button className="h-8 w-full py-1">Create a new form</Button>
          </div>
          <SearchBar />
          <ManageWorkspace />
          <div className="flex flex-col gap-2 rounded-es-lg bg-subtle p-4">
            <p className="text-black">Responses collected</p>
            <div className="h-2 w-full rounded-e-lg bg-secgraydark"></div>
            <span>0/10</span>
            <p className="text-sm">Resets on June 13</p>
            <Button
              className="text-secgray-dark my-2 h-6  w-3/4 rounded-md bg-white p-1 text-[12px] font-semibold"
              variant="outline"
            >
              Increase response limit
            </Button>
          </div>
        </div>
        <FormTable />
      </div>
    </main>
  )
}
