"use client"

import React, { useState } from "react"
import { type Workspace } from "@/db/schema"
import { CiGrid41 } from "react-icons/ci"
import { FaPlus } from "react-icons/fa"

import { createWorkspace } from "@/lib/actions/workspace"
import { createWorkspaceSchema } from "@/lib/validations/workspace"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import ChangeWorkspace from "@/components/main/change-workspace"

interface IMangeWorkspace {
  userId: string
  workspaces: Workspace[]
  setSelectedWorkspace: (v: Workspace) => void
  selectedWorkspace: Workspace
}

function ManageWorkspace({
  userId,
  workspaces,
  setSelectedWorkspace,
  selectedWorkspace,
}: IMangeWorkspace) {
  const [workspaceName, setWorkspaceName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [allWorkspaces, setAllWorkspaces] = useState(workspaces)

  const handleCreateWorkspace = async () => {
    setIsLoading(true)
    const validationResult = createWorkspaceSchema.safeParse({
      name: workspaceName,
    })
    if (!validationResult.success) {
      setErrorMessage(validationResult.error.errors[0].message)
    } else {
      setErrorMessage("")
      const res = await createWorkspace({ name: workspaceName, userId: userId })
      if (res.data && res.data.length > 0) {
        setAllWorkspaces([...allWorkspaces, res.data[0]])
      }
      setOpen(false)
    }
  }

  return (
    <div className="grow bg-subtle p-4">
      <div className="flex justify-between px-4 py-1 font-semibold">
        <span className="inline-flex items-center text-[16px]">
          <CiGrid41 size={20} /> &nbsp; Workspaces
        </span>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="aspect-square h-8 bg-white p-0 text-3xl text-black"
              variant="outline"
            >
              <FaPlus size={12} color="#5E5E5E" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogDescription className="text-2xl">
                Create a new workspace
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                id="name"
                placeholder="Name your workspace"
                className="col-span-3"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
              {errorMessage && (
                <p className="pl-2 text-xs text-destructive">{errorMessage}</p>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleCreateWorkspace}
                disabled={workspaceName === "" || isLoading}
                variant={"default"}
              >
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ChangeWorkspace
        selectedWorkspace={selectedWorkspace}
        workspaces={allWorkspaces}
        setSelectedWorkspace={setSelectedWorkspace}
      />
    </div>
  )
}

export default ManageWorkspace
