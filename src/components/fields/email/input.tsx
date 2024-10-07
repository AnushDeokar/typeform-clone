"use client"

import React, { useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function EmailInput({
  onSubmit,
  className,
  isLast = false,
}: {
  onSubmit: (e?: string) => void
  className?: string
  isLast?: boolean
}) {
  const textareaRef = useRef<any>(null)
  const [value, setValue] = useState("")

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
      <Input
        ref={textareaRef}
        value={value}
        type="email"
        className={cn(
          `resize-none overflow-hidden border-none p-0 text-xl text-[#104eb3] outline-none placeholder:text-[#b8cae8] focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${fitsInSingleLine() ? "pb-0" : ""}`,
          className
        )}
        placeholder="name@example.com"
        onChange={(e: any) => {
          adjustTextareaHeight()
          setValue(e.target.value)
        }}
      />
      <div className="flex">
        <Button
          className="h-10 rounded-md bg-[#104eb3] text-lg text-white hover:bg-[#104eb3]/80"
          onClick={() => {
            onSubmit(value)
          }}
        >
          {isLast ? "Submit" : "OK"}
        </Button>
      </div>
    </div>
  )
}

export default EmailInput
