"use client"

import React, { useState } from "react"
import { Workspace } from "@/db/schema"
import { motion } from "framer-motion"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"

interface IChangeWorkspace {
  workspaces: Workspace[]
  setSelectedWorkspace: (v: Workspace) => void
  selectedWorkspace: Workspace
}
function ChangeWorkspace({
  workspaces,
  setSelectedWorkspace,
  selectedWorkspace,
}: IChangeWorkspace) {
  const [isOpen, setIsOpen] = useState(true)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div
        className="mt-2 flex cursor-pointer items-center justify-between rounded-md px-4 py-2 hover:bg-secgraydark"
        onClick={handleToggle}
      >
        <span className="font-semibold">Private</span>
        {isOpen ? <FaCaretDown size={16} /> : <FaCaretUp size={16} />}
      </div>

      <motion.div
        className="flex w-full flex-col gap-1 py-2"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        {isOpen && (
          <>
            {workspaces.map((workspace) => (
              <div
                className={`cursor-pointer rounded-lg px-4 py-2 hover:bg-secgraydark ${selectedWorkspace.id === workspace.id ? " bg-secgraydark" : ""}`}
                key={workspace.id}
                onClick={() => setSelectedWorkspace(workspace)}
              >
                {workspace.name}
              </div>
            ))}
          </>
        )}
      </motion.div>
    </>
  )
}

export default ChangeWorkspace
