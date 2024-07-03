"use client"

import React, { useState } from "react"
import { Form, type Workspace } from "@/db/schema"

import { renameForm } from "@/lib/actions/form"
import { renameFormSchema } from "@/lib/validations/form"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface IRenameForm {
  form: Form
  forms: Form[]
  setForms: (v: Form[]) => void
  setOpen: (v: boolean) => void
}

function RenameFormDialog({ form, forms, setForms, setOpen }: IRenameForm) {
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
      if (success) {
        const updatedForm = { ...form, name: formName }
        setForms(forms.map((f) => (f.id === form.id ? updatedForm : f)))
      }
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
          placeholder="Eg. Aweshome survey"
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
