import React, { Suspense, useEffect, useState } from "react"
import { useQuestionStore } from "@/stores/question"
import { AnimatePresence, motion } from "framer-motion"
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa"

import { FIELDS } from "../fields"
import { Button } from "../ui/button"

interface IPreviewContent {
  refreshCount: number
  displayType: "MOBILE" | "DESKTOP"
}

const swipeUpVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
}

const ProgressBar = ({ progressBarWidth }: { progressBarWidth: number }) => (
  <div
    className="transition-width absolute top-0 h-1 bg-blue-500 duration-500 ease-in-out"
    style={{ width: `${progressBarWidth}%` }}
  ></div>
)

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
}: {
  selectedQuestion: number
  questionList: any[]
  selectedField: any
  setSelectedQuestion: React.Dispatch<React.SetStateAction<number>>
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={selectedQuestion}
      variants={swipeUpVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="flex flex-col"
    >
      <div className="flex p-4">
        <div className="mt-[6px] flex gap-2 text-[12px]">
          <span className="mt-1">{questionList[selectedQuestion]?.order}</span>
          <span className="mt-2">
            <FaArrowRight color="blue" />
          </span>
        </div>
        <div className="m-2 resize-none overflow-hidden border-none text-lg outline-none placeholder:italic focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
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
    </motion.div>
  </AnimatePresence>
)

function PreviewContent({ displayType, refreshCount }: IPreviewContent) {
  const { questionList } = useQuestionStore()
  const [selectedQuestion, setSelectedQuestion] = useState(0)

  useEffect(() => {
    setSelectedQuestion(0)
  }, [refreshCount, questionList])

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

  const progressBarWidth = ((selectedQuestion + 1) / questionList.length) * 100

  return (
    <div
      className={`relative flex grow flex-col justify-center border-2 ${displayType === "MOBILE" ? "w-[350px]" : "m-1 min-w-[600px] text-center md:m-8 md:min-w-[800px]"}`}
    >
      <ProgressBar progressBarWidth={progressBarWidth} />
      <div className="absolute bottom-0 flex w-full justify-between rounded-md p-4">
        <ControlButtons
          selectedQuestion={selectedQuestion}
          questionListLength={questionList.length}
          setSelectedQuestion={setSelectedQuestion}
        />
        <Button className="h-11 bg-[#104eb3] hover:bg-[#104eb3]/80">
          Built by Anush
        </Button>
      </div>
      <QuestionContent
        selectedQuestion={selectedQuestion}
        questionList={questionList}
        selectedField={selectedField}
        setSelectedQuestion={setSelectedQuestion}
      />
    </div>
  )
}

export default PreviewContent
