"use client"

import React, { useState } from "react"
import { Form } from "@/db/schema"
import { CiLaptop, CiMobile1, CiPlay1 } from "react-icons/ci"
import { FiPlus } from "react-icons/fi"

import { Button } from "../ui/button"
import AddContentDialog from "./add-content"
import MobileInputQuestion from "./mobile-question-input"

function FormDisplay({ form }: { form: Form }) {
  const [displayType, setDisplayType] = useState<"MOBILE" | "DESKTOP">("MOBILE")
  return (
    <div className="flex grow flex-col gap-4 p-2">
      <div className="flex w-full gap-2 rounded-xl bg-forge p-2 px-4">
        <div className="border-r-2 pr-4 ">
          <AddContentDialog formId={form.id} />
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
          <div className="flex h-full cursor-pointer items-center rounded-md p-1 hover:bg-secgraydark">
            <CiPlay1 size={16} />
          </div>
        </div>
      </div>
      <div className="flex grow justify-center">
        {displayType === "MOBILE" ? (
          <MobileInputQuestion />
        ) : (
          <div className="m-16 flex w-full items-center justify-center border-2 text-center">
            Test Question
          </div>
        )}
      </div>
    </div>
  )
}

export default FormDisplay
