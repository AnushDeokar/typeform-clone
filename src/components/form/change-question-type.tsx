"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useQuestionStore } from "@/stores/question"
import { Check, ChevronsUpDown } from "lucide-react"
import { LuText } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { FIELDS, QUESTION_TYPES } from "../fields"

const getFieldTypeAttributes = (type: string) => {
  const field = FIELDS.find((f) => f.type === type)
  const questionType = QUESTION_TYPES.find((q) => q.type === field?.group)
  return {
    icon: field ? field.icon : null,
    color: questionType ? questionType.color : null,
  }
}

function ChangeQuestionType() {
  const { selectedQuestion, setSelectedQuestion } = useQuestionStore()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(selectedQuestion?.type ?? "")

  const { icon, color } = useMemo(() => {
    return getFieldTypeAttributes(value)
  }, [value])

  useEffect(() => {
    if (selectedQuestion && value)
      setSelectedQuestion({ ...selectedQuestion, type: value })
  }, [value])

  useEffect(() => {
    if (selectedQuestion && selectedQuestion.type !== value)
      setValue(selectedQuestion.type)
  }, [selectedQuestion])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div className="flex grow items-center">
            {icon && (
              <div
                className={`mr-2 flex h-6 w-6 items-center justify-center rounded-sm`}
                style={{ backgroundColor: color ?? "" }}
              >
                {icon}
              </div>
            )}
            {value
              ? FIELDS.find((question) => question.type === value)?.name
              : "Select Question Type"}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search question..." />
          <CommandList>
            <CommandEmpty>No question found.</CommandEmpty>
            <CommandGroup>
              {FIELDS.map((question) => {
                const { icon, color } = getFieldTypeAttributes(question.type)
                return (
                  <CommandItem
                    key={question.type}
                    value={question.type}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    className={value === question.type ? "bg-secgraydark" : ""}
                  >
                    <div
                      className={`mr-2 flex h-6 w-6 items-center justify-center rounded-sm`}
                      style={{ backgroundColor: color ?? "" }}
                    >
                      {icon}
                    </div>
                    {question.name}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ChangeQuestionType
