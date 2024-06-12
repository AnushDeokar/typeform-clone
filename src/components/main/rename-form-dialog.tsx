"use client"

import React, { useEffect, useState } from "react"
import { Form, type Workspace } from "@/db/schema"
import { CiGrid41 } from "react-icons/ci"
import { FaPlus } from "react-icons/fa"

import { renameForm } from "@/lib/actions/form"
import { createWorkspace } from "@/lib/actions/workspace"
import { renameFormSchema } from "@/lib/validations/form"
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

interface IRenameForm {
  form: Form
  setForms: (v: Form[]) => void
  open: boolean
  setOpen: (v: boolean) => void
}

function RenameFormDialog({ form, setForms, open, setOpen }: IRenameForm) {
  const [formName, setformName] = useState(form.name)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateWorkspace = async () => {
    setIsLoading(true)
    const validationResult = renameFormSchema.safeParse({
      name: formName,
    })
    if (!validationResult.success) {
      setErrorMessage(validationResult.error.errors[0].message)
    } else {
      setErrorMessage("")
      const success = await renameForm(form.id, formName)
      setOpen(false)
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogDescription className="text-2xl">
          Rename this typeform
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Input
          id="name"
          placeholder="Name your workspace"
          className="col-span-3"
          value={formName}
          onChange={(e) => setformName(e.target.value)}
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
          disabled={formName === "" || isLoading}
          variant={"default"}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default RenameFormDialog
