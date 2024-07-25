"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useModalStore } from "@/stores/modal"
import { useQuestionStore } from "@/stores/question"
import { User } from "@clerk/nextjs/server"
import { TbSend2 } from "react-icons/tb"

import { publishForm } from "@/lib/actions/form"
import { Button } from "@/components/ui/button"

import ProfileButton from "../profile-button"
import { Icons } from "../ui/icons"

const navbarOptions = [
  {
    name: "Create",
    url: "/create",
  },
  {
    name: "Share",
    url: "/share",
  },
  {
    name: "Results",
    url: "/results",
  },
]

function FormNavbar({ user }: { user: User | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { selectedQuestion } = useQuestionStore()
  const { setPublishModal } = useModalStore()

  const handlePublish = async () => {
    if (!selectedQuestion) {
      return
    }
    setLoading(true)
    const res = await publishForm(selectedQuestion.formId)
    setPublishModal(true)
    setLoading(false)
  }

  return (
    <nav className="flex h-12 w-full items-center">
      <div className="flex items-center gap-2" onClick={() => router.push("/")}>
        <Image src="/logo.png" height={25} width={50} alt="logo" />
        <h3 className="text-[20px] font-semibold">Typeform</h3>
      </div>
      <div className="flex h-full w-full grow justify-center gap-8">
        <div className="flex  h-full border-t-4 border-black  text-[14px] font-semibold">
          <span className="mb-2 mt-auto">Create</span>
        </div>
        <div className="flex  h-full border-t-4  text-[14px] font-semibold text-secgray">
          <span className="mb-2 mt-auto">Share</span>
        </div>
        <div className="flex  h-full border-t-4  text-[14px] font-semibold text-secgray">
          <span className="mb-2 mt-auto">Results</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="flex h-8 items-center gap-1"
          onClick={handlePublish}
          disabled={loading}
        >
          {loading && (
            <Icons.spinner className="size-6 animate-spin" aria-hidden="true" />
          )}
          <TbSend2 size={14} /> Publish
        </Button>
        <div className="h-8 border"></div>
        <Button className="h-8 bg-[#ae4e09] hover:bg-[#754a2b]">
          View Plans
        </Button>
      </div>
      <ProfileButton user={user} />
    </nav>
  )
}

export default FormNavbar
