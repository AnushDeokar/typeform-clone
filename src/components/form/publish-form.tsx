"use client"

import React, { useEffect, useState } from "react"
import { useModalStore } from "@/stores/modal"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function PublishFormDialog({ formId }: { formId: string }) {
  const { publishModal, setPublishModal } = useModalStore()
  const [link, setLink] = useState("")
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    setLink(window.location.origin + "/form/" + formId + "/live")
  }, [])

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Dialog open={true} onOpenChange={setPublishModal}>
      <DialogContent className="w-auto bg-forge p-8">
        <DialogHeader>
          <DialogTitle className="mb-4  text-xl">
            Your Form has been published! 🎉
          </DialogTitle>
          <div className="mt-4 flex items-center gap-2 rounded-lg border bg-white p-2 text-sm">
            <h3 className="grow">{link}</h3>
            <Button
              className="p-2 text-[12px]"
              onClick={copyLinkToClipboard}
              disabled={copied}
            >
              {copied ? "Copied" : "Copy link"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PublishFormDialog
