"use client"

import React, { useRef } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function ShortTextInput({
  onSubmit,
  className,
  isLast = false,
}: {
  onSubmit: () => void
  className?: string
  isLast?: boolean
}) {
  const textareaRef = useRef<any>(null)

  const fitsInSingleLine = () => {
    const textarea = textareaRef.current
    if (textarea) {
      const { scrollWidth, clientWidth } = textarea
      return scrollWidth <= clientWidth
    }
    return true
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto" // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  return (
    <div className="my-4 flex flex-col gap-1">
      <Textarea
        ref={textareaRef}
        className={cn(
          `resize-none overflow-hidden border-none p-0 text-xl text-[#104eb3] outline-none placeholder:text-[#b8cae8] focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${fitsInSingleLine() ? "pb-0" : ""}`,
          className
        )}
        placeholder="Type your answer here..."
        onChange={(e: any) => {
          adjustTextareaHeight()
        }}
      />
      <div className="flex">
        <Button
          className="h-10 rounded-md bg-[#104eb3] text-lg text-white hover:bg-[#104eb3]/80"
          onClick={onSubmit}
        >
          {isLast ? "Submit" : "OK"}
        </Button>
      </div>
    </div>
  )
}

export default ShortTextInput
