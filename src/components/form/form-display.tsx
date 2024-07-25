"use client"

import React, { useState } from "react"
import { Form } from "@/db/schema"
import { usePreviewStore } from "@/stores/preview"
import { CiLaptop, CiMobile1, CiPlay1 } from "react-icons/ci"

import AddContentDialog from "./add-content"
import PublishFormDialog from "./publish-form"
import InputQuestion from "./question-input"

function FormDisplay({ form }: { form: Form }) {
  const [displayType, setDisplayType] = useState<"MOBILE" | "DESKTOP">("MOBILE")
  const { setOpen } = usePreviewStore()
  return (
    <div className="flex grow flex-col gap-4 p-2">
      <div className="flex w-full gap-2 rounded-xl bg-forge p-2 px-4">
        <div className="border-r-2 pr-4 ">
          <AddContentDialog formId={form.id} />
          <PublishFormDialog formId={form.id} />
        </div>
        <div className="flex gap-2 border-r-2 pr-4">
          <div
            className="flex h-full cursor-pointer items-center rounded-md p-1 hover:bg-secgraydark"
            onClick={() =>
              displayType === "DESKTOP"
                ? setDisplayType("MOBILE")
                : setDisplayType("DESKTOP")
            }
          >
            {displayType === "DESKTOP" ? (
              <CiMobile1 size={20} />
            ) : (
              <CiLaptop size={20} />
            )}
          </div>
          <div
            className="flex h-full cursor-pointer items-center rounded-md p-1 hover:bg-secgraydark"
            onClick={() => setOpen(true)}
          >
            <CiPlay1 size={16} />
          </div>
        </div>
      </div>
      <div className="flex grow justify-center">
        <InputQuestion displayType={displayType} />
      </div>
    </div>
  )
}

export default FormDisplay
