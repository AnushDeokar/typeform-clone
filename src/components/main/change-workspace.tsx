"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"

function ChangeWorkspace() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div
        className="mt-2 flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-secgraydark"
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
            <div className="cursor-pointer rounded-lg px-4 py-2 hover:bg-secgraydark">
              workspace 1
            </div>
            <div className="cursor-pointer rounded-lg px-4 py-2 hover:bg-secgraydark">
              workspace 2
            </div>
          </>
        )}
      </motion.div>
    </>
  )
}

export default ChangeWorkspace
