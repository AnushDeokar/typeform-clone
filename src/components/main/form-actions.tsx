import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Form } from "@/db/schema"
import toast from "react-hot-toast"
import { BsThreeDots } from "react-icons/bs"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog"
import RenameFormDialog from "./rename-form-dialog"

function FormActionsComponent({
  form,
  setForms,
}: {
  form: Form
  setForms: (v: Form[]) => void
}) {
  const router = useRouter()
  const [openRenameDialog, setOpenRenameDialog] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/form/${form.id}`
      )
      toast.success("Link copied to clipboard", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }
  useEffect(() => {
    console.log("oppp", open)
  }, [open])

  return (
    <Dialog open={openRenameDialog} onOpenChange={setOpenRenameDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-12 border-none">
            <BsThreeDots />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-8 w-40">
          <DropdownMenuItem onClick={() => router.push(`/form/${form.id}`)}>
            Open
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink}>
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DialogTrigger
              onClick={() => setOpenRenameDialog(true)}
              className="w-full text-left"
            >
              <div>Rename</div>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => toast.error("This feature is in progress!")}
          >
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive hover:text-destructive"
            onClick={() => toast.success("Successfully Deleted!")}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameFormDialog
        form={form}
        setForms={setForms}
        open={openRenameDialog}
        setOpen={setOpenRenameDialog}
      />
    </Dialog>
  )
}

export default FormActionsComponent
