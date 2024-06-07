"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { type Workspace } from "@/db/schema"
import { FaPlus } from "react-icons/fa"

import { createForm } from "@/lib/actions/form"

import { Button } from "../ui/button"
import ManageWorkspace from "./create-workspace-dialog"
import FormTable from "./form-table"
import SearchBar from "./search-bar"

interface IMainDisplay {
  userId: string
  workspaces: Workspace[]
}

function MainDisplay({ userId, workspaces }: IMainDisplay) {
  const router = useRouter()
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0])

  const handleCreateForm = async () => {
    const response = await createForm({
      workspaceId: selectedWorkspace.id,
      name: "My new form",
    })
    if (!response.error) {
      router.push(`/form/${response.data?.id}`)
    }
  }

  return (
    <div className="mt-2 flex w-full grow gap-1 text-[14px]">
      <div className="hidden w-64 flex-col gap-1 text-secgray md:flex">
        <div className="rounded-ss-lg bg-subtle px-4 py-2">
          <Button
            className="inline-flex h-8 w-full items-center gap-2 py-1"
            onClick={handleCreateForm}
          >
            <FaPlus />
            Create a new form
          </Button>
        </div>
        <SearchBar />
        <ManageWorkspace
          userId={userId}
          workspaces={workspaces}
          setSelectedWorkspace={setSelectedWorkspace}
        />
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
      <FormTable selectedWorkspace={selectedWorkspace} />
    </div>
  )
}

export default MainDisplay
