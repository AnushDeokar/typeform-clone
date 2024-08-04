"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useQuestionStore } from "@/stores/question"
import { ChevronsUpDown } from "lucide-react"

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
import { Switch } from "../ui/switch"

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
    <div className="flex flex-col gap-4 py-6">
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
                      className={
                        value === question.type ? "bg-secgraydark" : ""
                      }
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
      <div className="flex flex-col gap-4 border-y-2 py-4 text-[14px] text-secgray">
        <h4 className="mb-2 px-2 font-semibold">Settings</h4>
        <div className="flex w-full justify-between px-2">
          <span>Required</span>
          <Switch className="h-4 w-[34px]" />
        </div>
      </div>
    </div>
  )
}

export default ChangeQuestionType
