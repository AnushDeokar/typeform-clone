import React from "react"
import toast from "react-hot-toast"
import { BsThreeDots } from "react-icons/bs"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function FormActionsComponent({ formId }: { formId: string }) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/form/${formId}`
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-12 border-none">
          <BsThreeDots />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 w-40">
        <DropdownMenuItem>Open</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>Copy Link</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive hover:text-destructive"
          onClick={() => toast.success("Successfully Deleted!")}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FormActionsComponent
