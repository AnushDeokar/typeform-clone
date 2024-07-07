import { Question } from "@/db/schema"
import { create } from "zustand"

interface PreviewState {
  open: boolean
  setOpen: (open: boolean) => void
  questionList: Question[]
  setQuestionList: (questionList: Question[]) => void
}

export const usePreviewStore = create<PreviewState>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set(() => ({ open })),
  questionList: [],
  setQuestionList: (questionList: Question[]) => set(() => ({ questionList })),
}))
