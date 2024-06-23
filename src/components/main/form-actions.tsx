import React, { useMemo, useState } from "react"
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

import { Dialog } from "../ui/dialog"
import DeleteFormDialog from "./delete-form-dialog"
import RenameFormDialog from "./rename-form-dialog"

const menuItemStyles = {
  default: "p-1 hover:bg-secgraydark rounded-md w-1/2",
  destructive: "text-destructive",
}

function FormActionsComponent({
  form,
  forms,
  setForms,
}: {
  form: Form
  forms: Form[]
  setForms: (v: Form[]) => void
}) {
  const router = useRouter()
  const [dialogState, setDialogState] = useState({
    openRenameDialog: false,
    deleteFormDialog: false,
  })

  const openDialog = (dialog: string) =>
    setDialogState({ ...dialogState, [dialog]: true })
  const closeDialog = (dialog: string) =>
    setDialogState({ ...dialogState, [dialog]: false })

  const menuItems = useMemo(
    () => [
      {
        label: "Open",
        onClick: () => router.push(`/form/${form.id}/create`),
      },
      {
        label: "Copy Link",
        onClick: async () => {
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
        },
      },
      {
        type: "separator",
      },
      {
        label: "Rename",
        onClick: () => openDialog("openRenameDialog"),
      },
      {
        label: "Duplicate",
        onClick: () => toast.error("This feature is in progress!"),
      },
      {
        type: "separator",
      },
      {
        label: "Delete",
        onClick: () => openDialog("deleteFormDialog"),
        className: menuItemStyles.destructive,
      },
    ],
    [form, router]
  )

  return (
    <Dialog
      open={dialogState.openRenameDialog || dialogState.deleteFormDialog}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setDialogState({ openRenameDialog: false, deleteFormDialog: false })
        }
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-12 cursor-pointer border-none">
            <div className={menuItemStyles.default}>
              <BsThreeDots />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-8 w-40">
          {menuItems.map((item, index) =>
            item.type === "separator" ? (
              <DropdownMenuSeparator key={index} />
            ) : (
              <DropdownMenuItem
                key={index}
                onClick={item.onClick}
                className={item.className || ""}
              >
                {item.label}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogState.openRenameDialog && (
        <RenameFormDialog
          form={form}
          forms={forms}
          setForms={setForms}
          setOpen={(isOpen) => closeDialog("openRenameDialog")}
        />
      )}
      {dialogState.deleteFormDialog && (
        <DeleteFormDialog
          form={form}
          forms={forms}
          setForms={setForms}
          setOpen={(isOpen) => closeDialog("deleteFormDialog")}
        />
      )}
    </Dialog>
  )
}

export default FormActionsComponent
