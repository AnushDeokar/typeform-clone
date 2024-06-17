import React from "react"
import { CiLaptop, CiPlay1 } from "react-icons/ci"
import { FiPlus } from "react-icons/fi"

import { Button } from "../ui/button"

function FormDisplay() {
  return (
    <div className="flex grow flex-col gap-4 p-2">
      <div className="flex w-full gap-2 rounded-xl bg-forge p-2 px-4">
        <div className="border-r-2 pr-4 ">
          <Button variant="outline" className="flex h-8 items-center gap-2">
            <FiPlus />
            <span>Add content</span>
          </Button>
        </div>
        <div className="flex gap-2 border-r-2 pr-4">
          <div className="flex h-full cursor-pointer items-center rounded-md p-1 hover:bg-secgraydark">
            <CiLaptop size={20} />
          </div>
          <div className="flex h-full cursor-pointer items-center rounded-md p-1 hover:bg-secgraydark">
            <CiPlay1 size={20} />
          </div>
        </div>
      </div>
      <div className="flex grow justify-center">
        <div className="flex w-80 items-center justify-center border-2 text-center">
          Test Question
        </div>
      </div>
    </div>
  )
}

export default FormDisplay
