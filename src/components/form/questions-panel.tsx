"use client"

import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Question } from "@/db/schema"
import { useQuestionStore } from "@/stores/question"
import { FaPlus } from "react-icons/fa"
import { LuText } from "react-icons/lu"

import { Button } from "@/components/ui/button"

import { FIELDS, QUESTION_TYPES } from "../fields"

const getFieldTypeAttributes = (type: string) => {
  const field = FIELDS.find((f) => f.type === type)
  const questionType = QUESTION_TYPES.find((q) => q.type === field?.group)
  return {
    icon: field ? field.icon : <LuText />,
    color: questionType ? questionType.color : "#afd5f3",
  }
}

function QuestionsPanel({ questions }: { questions: Question[] }) {
  const [height, setHeight] = useState<number>(500)
  const { selectedQuestion, setSelectedQuestion } = useQuestionStore()

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

  useEffect(() => {
    if (questions.length > 0 && !selectedQuestion) {
      setSelectedQuestion(questions[0])
    }
  }, [])

  return (
    <div className="hidden max-h-full flex-col items-center gap-4 p-2 md:flex">
      <div
        className="w-60 grow flex-col gap-2 overflow-auto rounded-xl bg-forge p-4 text-[13px] text-secgray"
        style={{ height }}
      >
        {selectedQuestion &&
          questions.map((question) => {
            const { icon, color } = getFieldTypeAttributes(question.type)
            return question.id === selectedQuestion?.id ? (
              <div
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-secgraydark p-[10px]"
                key={question.id}
              >
                <div
                  className="flex w-12 items-center justify-center justify-between rounded-md p-1"
                  style={{ backgroundColor: color }}
                >
                  {icon} <span>{question.order}</span>
                </div>
                <span>{question.text}</span>
              </div>
            ) : (
              <div
                className="flex cursor-pointer items-center gap-1 rounded-lg p-[10px] hover:bg-secgraydark/40"
                key={question.id}
              >
                <div
                  className="flex w-12 items-center justify-center justify-between rounded-md p-1"
                  style={{ backgroundColor: color }}
                >
                  {icon} <span>{question.order}</span>
                </div>
                <span>{question.text}</span>
              </div>
            )
          })}
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
