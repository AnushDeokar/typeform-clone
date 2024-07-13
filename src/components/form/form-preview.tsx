"use client"

import React, { useState } from "react"
import { usePreviewStore } from "@/stores/preview"
import { CiLaptop, CiMobile1 } from "react-icons/ci"
import { IoMdClose } from "react-icons/io"
import { MdOutlineRestartAlt } from "react-icons/md"

import PreviewContent from "./preview-content"

function FormPreview() {
  const { open, setOpen } = usePreviewStore()
  const [refreshCount, setRefreshCount] = useState(0)
  const [displayType, setDisplayType] = useState<"MOBILE" | "DESKTOP">("MOBILE")

  return (
    <div
      className={
        open
          ? "fixed left-0 top-0 z-50 flex h-screen w-screen justify-center bg-white py-8"
          : "hidden"
      }
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex w-48 gap-4 rounded-lg bg-subtle p-2 px-4">
          <div
            className="flex flex-grow cursor-pointer items-center justify-center rounded-md p-2 hover:bg-secgraydark"
            onClick={() => setOpen(false)}
          >
            <IoMdClose size={20} />
          </div>
          <div
            className="flex flex-grow cursor-pointer items-center justify-center rounded-md p-2 hover:bg-secgraydark"
            onClick={() =>
              displayType === "MOBILE"
                ? setDisplayType("DESKTOP")
                : setDisplayType("MOBILE")
            }
          >
            {displayType === "MOBILE" ? (
              <CiLaptop size={20} />
            ) : (
              <CiMobile1 size={20} />
            )}
          </div>
          <div
            className="flex flex-grow cursor-pointer items-center justify-center rounded-md p-2 hover:bg-secgraydark"
            onClick={() => setRefreshCount(refreshCount + 1)}
          >
            <MdOutlineRestartAlt size={20} />
          </div>
        </div>
        <PreviewContent refreshCount={refreshCount} displayType={displayType} />
      </div>
    </div>
  )
}

export default FormPreview
