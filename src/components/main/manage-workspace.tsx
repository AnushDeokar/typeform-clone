import React from "react"
import { CiBoxList, CiGrid41 } from "react-icons/ci"
import { FaCaretDown, FaPlus } from "react-icons/fa"

import { Button } from "../ui/button"

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
      <div className="mt-2 flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-secgraydark">
        <span className="font-semibold">Private</span>
        <FaCaretDown size={16} />
      </div>
      <div className="flex w-full flex-col gap-1 py-2">
        <div className="cursor-pointer rounded-lg px-4 py-2 hover:bg-secgraydark">
          workspace 1
        </div>
        <div className="cursor-pointer rounded-lg px-4 py-2 hover:bg-secgraydark">
          workspace 2
        </div>
      </div>
    </div>
  )
}

export default ManageWorkspace
