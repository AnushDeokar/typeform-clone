import { Question } from "@/db/schema"
import { create } from "zustand"

interface QuestionState {
  selectedQuestion: Question | null
  setSelectedQuestion: (selectedQuestion: Question | null) => void
  questionList: Question[]
  setQuestionList: (questionList: Question[]) => void
}

export const useQuestionStore = create<QuestionState>()((set) => ({
  selectedQuestion: null,
  setSelectedQuestion: (selectedQuestion: Question | null) =>
    set(() => ({ selectedQuestion })),
  questionList: [],
  setQuestionList: (questionList: Question[]) => set(() => ({ questionList })),
}))
