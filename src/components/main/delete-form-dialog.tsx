"use client"

import React, { useEffect, useState } from "react"
import { Form, type Workspace } from "@/db/schema"
import { CiGrid41 } from "react-icons/ci"
import { FaPlus } from "react-icons/fa"

import { deleteFormById, renameForm } from "@/lib/actions/form"
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

interface IDeleteForm {
  form: Form
  forms: Form[]
  setForms: (v: Form[]) => void
  setOpen: (v: boolean) => void
}

function DeleteFormDialog({ form, forms, setForms, setOpen }: IDeleteForm) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteForm = async () => {
    setIsLoading(true)
    const res = await deleteFormById(form.id)
    if (!res.error) {
      setForms(forms.filter((f) => f.id !== form.id))
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogDescription className="text-2xl text-black">
          Delete this typeform?
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4 py-4 text-sm">
        <p>You&apos;re about to delete {form.name}.</p>
        <p>
          It&apos;ll be gone forever and we won&apos;t be able to recover it.
        </p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button
          onClick={handleDeleteForm}
          disabled={isLoading}
          variant="destructive"
        >
          {isLoading ? "Deleting..." : "Yes, Delete it"}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default DeleteFormDialog
