import { create } from "zustand"

interface ModalState {
  publishModal: boolean
  setPublishModal: (publishModal: boolean) => void
}

export const useModalStore = create<ModalState>()((set) => ({
  publishModal: false,
  setPublishModal: (publishModal: boolean) => set(() => ({ publishModal })),
}))
