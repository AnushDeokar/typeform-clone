"use client"

import React, { MouseEvent, useCallback, useState } from "react"
import { FaPlus } from "react-icons/fa"

import { Button } from "@/components/ui/button"

function QuestionsPanel() {
  const [height, setHeight] = useState<number>(500) // initial height for the first div

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const startY = e.clientY
      const startHeight = height

      const onMouseMove = (e: MouseEvent) => {
        const newHeight = startHeight + e.clientY - startY
        setHeight(newHeight)
      }

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove as any)
        document.removeEventListener("mouseup", onMouseUp)
      }

      document.addEventListener("mousemove", onMouseMove as any)
      document.addEventListener("mouseup", onMouseUp)
    },
    [height]
  )

  return (
    <div className="hidden max-h-full flex-col items-center gap-4 p-2 md:flex">
      <div
        className="w-60 grow flex-col gap-1 overflow-auto rounded-xl bg-forge p-4"
        style={{ height }}
      >
        <div className="cursor-pointer rounded-lg bg-secgraydark p-[10px] text-[13px] text-secgray">
          Test question
        </div>
        <div className="cursor-pointer rounded-lg p-[10px] text-[13px] text-secgray hover:bg-secgraydark/40">
          Test question
        </div>
      </div>
      <div
        className="h-1 w-8 cursor-row-resize rounded-lg bg-black"
        onMouseDown={handleMouseDown}
      ></div>
      <div
        className="w-full grow overflow-auto rounded-xl bg-forge p-4"
        style={{ height: `calc(100% - ${height}px - 32px)` }}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold">Endings</span>
          <Button
            className="aspect-square h-8 bg-white p-0 text-3xl text-black"
            variant="outline"
          >
            <FaPlus size={12} color="#5E5E5E" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuestionsPanel
