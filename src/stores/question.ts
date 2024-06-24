import { Question } from "@/db/schema"
import { create } from "zustand"

export const useQuestionStore = create<any>()((set) => ({
  selectedQuestion: null,
  setSelectedQuestion: (selectedQuestion: Question | null) =>
    set(() => ({ selectedQuestion })),
}))
