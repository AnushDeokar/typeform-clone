"use client"

import React, { Suspense, useEffect, useState } from "react"
import { Question } from "@/db/schema"
import { useQuestionStore } from "@/stores/question"
import { AnimatePresence, motion } from "framer-motion"
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa"

import { addResponses } from "@/lib/actions/response"

import { FIELDS } from "../fields"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

interface IPreviewContent {
  questionList: Question[]
}

const swipeUpVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
}

const ControlButtons = ({
  selectedQuestion,
  questionListLength,
  setSelectedQuestion,
}: {
  selectedQuestion: number
  questionListLength: number
  setSelectedQuestion: React.Dispatch<React.SetStateAction<number>>
}) => (
  <div className="flex gap-[1px]">
    <Button
      className="h-11 w-11 bg-[#104eb3] hover:bg-[#104eb3]/80"
      disabled={selectedQuestion === 0}
      onClick={() => setSelectedQuestion(selectedQuestion - 1)}
    >
      <FaChevronUp size={40} color="white" />
    </Button>
    <Button
      className="h-11 w-11 bg-[#104eb3] hover:bg-[#104eb3]/80"
      disabled={selectedQuestion === questionListLength - 1}
      onClick={() => setSelectedQuestion(selectedQuestion + 1)}
    >
      <FaChevronDown size={30} color="white" />
    </Button>
  </div>
)

const QuestionContent = ({
  selectedQuestion,
  questionList,
  selectedField,
  setSelectedQuestion,
  isLast = false,
  setDisplayEndScreen,
}: {
  selectedQuestion: number
  questionList: any[]
  selectedField: any
  setSelectedQuestion: React.Dispatch<React.SetStateAction<number>>
  isLast?: boolean
  setDisplayEndScreen: (v: boolean) => void
}) => {
  const [responses, setResponses] = useState<any[]>([])
  const handleSubmitResponses = async (allResponses: any[]) => {
    const res = await addResponses(allResponses)
    if (res.data) {
      setDisplayEndScreen(true)
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedQuestion}
        variants={swipeUpVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25 }}
        className="flex w-full flex-col sm:px-[20%]"
      >
        <div className="flex p-4">
          <div className="mt-[6px] flex gap-2 text-[12px] md:text-2xl">
            <span className="mt-1">
              {questionList[selectedQuestion]?.order}
            </span>
            <span className="mt-2">
              <FaArrowRight color="blue" />
            </span>
          </div>
          <div className="m-2 resize-none overflow-hidden border-none text-lg outline-none placeholder:italic focus:ring-0 focus-visible:outline-none focus-visible:ring-0 md:text-2xl">
            {questionList[selectedQuestion].text}
          </div>
        </div>
        <div className="w-full px-8">
          {selectedField && (
            <Suspense fallback={<Skeleton className="h-4 w-12" />}>
              <selectedField.input
                className="text-2xl"
                onSubmit={(v: any) => {
                  if (selectedQuestion + 1 === questionList.length) {
                    setDisplayEndScreen(true)
                  } else {
                    setSelectedQuestion(
                      selectedQuestion + 1 === questionList.length
                        ? 0
                        : selectedQuestion + 1
                    )
                  }
                  const newResponses = responses.filter(
                    (r) => r.questionId !== questionList[selectedQuestion].id
                  )
                  const newResponse = {
                    questionId: questionList[selectedQuestion].id,
                    text: v,
                    formId: questionList[selectedQuestion].formId,
                  }
                  newResponses.push(newResponse)
                  setResponses(newResponses)
                  if (isLast) {
                    handleSubmitResponses(newResponses)
                  }
                }}
                isLast={isLast}
              />
            </Suspense>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function PreviewContent({ questionList }: IPreviewContent) {
  const [selectedQuestion, setSelectedQuestion] = useState(0)
  const [displayEndScreen, setDisplayEndScreen] = useState(false)

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

  if (displayEndScreen) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 text-center">
        <p className="italic">Thank you for submitting the form!</p>
        <Button
          className="h-11 bg-[#104eb3] hover:bg-[#104eb3]/80"
          onClick={() => {
            setSelectedQuestion(0)
            setDisplayEndScreen(false)
          }}
        >
          Submit another response
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="absolute bottom-0 flex w-full justify-between rounded-md p-4">
        <ControlButtons
          selectedQuestion={selectedQuestion}
          questionListLength={questionList.length}
          setSelectedQuestion={setSelectedQuestion}
        />
        <a
          href="https://github.com/AnushDeokar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="h-11 bg-[#104eb3] hover:bg-[#104eb3]/80">
            Built by Anush
          </Button>
        </a>
      </div>
      <div className="flex h-full w-full grow items-center justify-center">
        <QuestionContent
          selectedQuestion={selectedQuestion}
          questionList={questionList}
          selectedField={selectedField}
          setSelectedQuestion={setSelectedQuestion}
          isLast={selectedQuestion === questionList.length - 1}
          setDisplayEndScreen={setDisplayEndScreen}
        />
      </div>
    </div>
  )
}

export default PreviewContent
