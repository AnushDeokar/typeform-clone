"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { FaPlus } from "react-icons/fa"

import { createForm } from "@/lib/actions/main"

import { Button } from "../ui/button"
import ManageWorkspace from "./create-workspace-dialog"
import FormTable from "./form-table"
import SearchBar from "./search-bar"

function MainDisplay({ userId }: any) {
  const router = useRouter()

  const handleCreateForm = async () => {
    const response = await createForm({
      workspaceId: "76261ee4-163a-497c-ad1b-64aab7555190",
      name: "My new form",
    })
    if (!response.error) {
      router.push(`/form/${response.data?.id}`)
    }
  }

  return (
    <div className="mt-2 flex w-full grow gap-1 text-[14px]">
      <div className="flex w-64 flex-col gap-1 text-secgray">
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
        <ManageWorkspace userId={userId} />
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
  )
}

export default MainDisplay
