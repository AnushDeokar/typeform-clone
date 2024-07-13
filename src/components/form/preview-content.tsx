import React, { Suspense, useEffect, useRef, useState } from "react"
import { useQuestionStore } from "@/stores/question"
import { FaArrowRight } from "react-icons/fa"

import { updateQuestionById } from "@/lib/actions/question"
import useDebounce from "@/hooks/use-debounce"
import { Textarea } from "@/components/ui/textarea"

import { FIELDS } from "../fields"

interface IPreviewContent {
  screenNumber: number
  displayType: "MOBILE" | "DESKTOP"
}

function PreviewContent({ displayType, screenNumber }: IPreviewContent) {
  const { questionList } = useQuestionStore()

  const [selectedQuestion, setSelectedQuestion] = useState(0)

  useEffect(() => {
    setSelectedQuestion(0)
  }, [screenNumber, questionList])

  if (questionList.length === 0) {
    return (
      <div className="flex h-full items-center text-center">
        Add Content to Get started
      </div>
    )
  }

  const selectedField = FIELDS.find(
    (f) => f.type === questionList[selectedQuestion].type
  )

  return displayType === "MOBILE" ? (
    <div
      className={
        displayType === "MOBILE"
          ? "flex w-96 grow flex-col justify-center border-2 p-4"
          : "m-16 flex w-full grow flex-col justify-center border-2 px-8 text-center"
      }
    >
      <div className="flex">
        <div className="mt-[6px] flex gap-2 text-[12px]">
          <span className="mt-1">{questionList[selectedQuestion]?.order}</span>
          <span className="mt-2">
            <FaArrowRight color="blue" />
          </span>
        </div>
        <div className="m-2  resize-none overflow-hidden border-none text-lg outline-none placeholder:italic focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
          {questionList[selectedQuestion].text}
        </div>
      </div>
      <div className="px-8">
        {selectedField && (
          <Suspense fallback={<div></div>}>
            <selectedField.input
              onSubmit={() => {
                setSelectedQuestion(
                  selectedQuestion + 1 === questionList.length
                    ? 0
                    : selectedQuestion + 1
                )
              }}
            />
          </Suspense>
        )}
      </div>
    </div>
  ) : (
    <div className="m-16 flex w-full flex-col justify-center border-2 px-8 text-center">
      <div className="flex">
        <div className="mt-[6px] flex gap-2 text-lg">
          <span className="mt-1">{questionList[selectedQuestion]?.order}</span>
          <span className="mt-2">
            <FaArrowRight color="blue" />
          </span>
        </div>
        <div className="m-2 resize-none overflow-hidden border-none outline-none placeholder:italic focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
          {questionList[selectedQuestion].text}
        </div>
      </div>
      <div className="pl-10 text-lg">
        {selectedField && (
          <Suspense fallback={<div></div>}>
            <selectedField.input
              onSubmit={() => {
                setSelectedQuestion(
                  selectedQuestion + 1 === questionList.length
                    ? 0
                    : selectedQuestion + 1
                )
              }}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default PreviewContent
