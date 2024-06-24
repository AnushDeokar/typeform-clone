"use client"

import React, { useState } from "react"
import { FiPlus } from "react-icons/fi"

import { addQuestion } from "@/lib/actions/question"
import { type AddQuestionSchema } from "@/lib/validations/question"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FIELDS, QUESTION_TYPES } from "../fields"

function AddContentDialog({ formId }: { formId: string }) {
  const [open, setOpen] = useState(false)

  const handleAddQuestion = async (questionType: any) => {
    const input: AddQuestionSchema = {
      text: "",
      order: 1,
      type: questionType,
      formId: formId,
    }
    const res = await addQuestion(input)
    if (!res.error) {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex h-8 items-center gap-2">
          <FiPlus />
          <span>Add content</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto bg-forge">
        <DialogHeader>
          <DialogTitle className="mb-4">Add Content</DialogTitle>
          <div className="mt-4 grid grid-cols-1 gap-8 rounded-lg bg-white p-4 text-sm md:grid-cols-2 lg:grid-cols-3">
            {QUESTION_TYPES.map((t) => (
              <div className="flex flex-col gap-2" key={t.name}>
                <h4 className="font-semibold">{t.name}</h4>
                {FIELDS.filter((f) => f.group === t.type).map((f, i) => (
                  <div
                    className="flex cursor-pointer items-center gap-4 rounded-md p-2 text-secgray hover:bg-secgraydark"
                    key={i}
                    onClick={() => handleAddQuestion(f.type)}
                  >
                    <div
                      className="flex aspect-square w-6 items-center justify-center rounded-md"
                      style={{
                        backgroundColor: t.color,
                        width: "30px",
                        height: "30px",
                      }}
                    >
                      {f.icon}
                    </div>
                    <span className="whitespace-nowrap">{f.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddContentDialog
