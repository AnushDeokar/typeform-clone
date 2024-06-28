import React, { Suspense, useEffect, useRef } from "react"
import { useQuestionStore } from "@/stores/question"
import { FaArrowRight } from "react-icons/fa"

import { updateQuestionById } from "@/lib/actions/question"
import useDebounce from "@/hooks/use-debounce"

import { FIELDS } from "../fields"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

function MobileInputQuestion() {
  const {
    selectedQuestion,
    setSelectedQuestion,
    setQuestionList,
    questionList,
  } = useQuestionStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const debouncedValue = useDebounce(selectedQuestion, 2000)

  useEffect(() => {
    adjustTextareaHeight()
  }, [selectedQuestion?.text])

  useEffect(() => {
    const saveQuestion = async () => {
      const isUpdated = await updateQuestionById(selectedQuestion)
      if (isUpdated)
        setQuestionList(
          questionList.map((q) =>
            selectedQuestion && q.id === selectedQuestion.id
              ? selectedQuestion
              : q
          )
        )
    }

    selectedQuestion && saveQuestion()
  }, [debouncedValue])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto" // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px` // Set new height based on content
    }
  }

  // Function to check if text fits in a single line
  const fitsInSingleLine = () => {
    const textarea = textareaRef.current
    if (textarea) {
      const { scrollWidth, clientWidth } = textarea
      return scrollWidth <= clientWidth
    }
    return true // Default to true if textarea not available
  }

  if (!selectedQuestion) {
    return <div>Nothing selected</div>
  }

  const selectedField = FIELDS.find((f) => f.type === selectedQuestion.type)

  return (
    <div className="flex w-80 flex-col justify-center border-2 p-4">
      <div className="flex">
        <div className="mt-[6px] flex gap-2 text-[12px]">
          <span className="mt-1">{selectedQuestion?.order}</span>
          <span className="mt-2">
            <FaArrowRight color="blue" />
          </span>
        </div>
        <Textarea
          ref={textareaRef}
          className={`resize-none overflow-hidden border-none outline-none placeholder:italic focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${fitsInSingleLine() ? "h-2 pb-0" : ""}`}
          placeholder={
            selectedField?.type === "WELCOME"
              ? "This is your welcome screen. Say hi!"
              : "Your Question here"
          }
          value={selectedQuestion.text}
          onChange={(e) => {
            setSelectedQuestion({ ...selectedQuestion, text: e.target.value })
            adjustTextareaHeight()
          }}
        />
      </div>
      <div className="px-8">
        {selectedField && (
          <Suspense fallback={<div></div>}>
            <selectedField.createAnswer />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default MobileInputQuestion
