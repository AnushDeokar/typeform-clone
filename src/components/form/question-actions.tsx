import React, { useState } from "react"
import { Question } from "@/db/schema"
import { useQuestionStore } from "@/stores/question"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { IoDuplicateOutline } from "react-icons/io5"
import { MdDeleteOutline } from "react-icons/md"

import { deleteQuestion, duplicateQuestion } from "@/lib/actions/question"

import { Dialog } from "../ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

function QuestionActions({ question }: { question: Question }) {
  const [open, setOpen] = useState(false)
  const { setQuestionList } = useQuestionStore()

  const handleDeleteQuestion = async () => {
    if (question.id) {
      const questions = await deleteQuestion(question)
      setQuestionList(questions)
    }
  }

  const handleDuplicateQuestion = async () => {
    if (question.id) {
      const questions = await duplicateQuestion(question)
      setQuestionList(questions)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setOpen(false)
        }
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="rounded-sm p-1 hover:bg-secgraydark">
            <HiOutlineDotsVertical />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-8 w-40">
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={handleDuplicateQuestion}
          >
            <IoDuplicateOutline size={20} /> Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 text-red-500"
            onClick={handleDeleteQuestion}
          >
            <MdDeleteOutline size={20} color="red" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}

export default QuestionActions
