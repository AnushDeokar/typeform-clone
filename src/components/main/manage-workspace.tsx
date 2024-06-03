import React from "react"
import { CiGrid41 } from "react-icons/ci"
import { FaPlus } from "react-icons/fa"

import { Button } from "../ui/button"
import ChangeWorkspace from "./change-workspace"

function ManageWorkspace() {
  return (
    <div className="grow bg-subtle p-4">
      <div className="flex justify-between px-4 py-1 font-semibold">
        <span className="inline-flex items-center text-[16px]">
          <CiGrid41 size={20} /> &nbsp; Workspaces
        </span>
        <Button
          className="aspect-square h-8 bg-white p-0 text-3xl text-black"
          variant="outline"
        >
          <FaPlus size={12} color="#5E5E5E" />
        </Button>
      </div>
      <ChangeWorkspace />
    </div>
  )
}

export default ManageWorkspace
