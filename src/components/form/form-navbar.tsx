"use client"

import React from "react"
import Image from "next/image"
import { useClerk } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/server"
import { TbSend2 } from "react-icons/tb"

import ProfileButton from "../profile-button"
import { Button } from "../ui/button"

const navbarOptions = [
  {
    name: "Create",
    url: "/create",
  },
  {
    name: "Share",
    url: "/share",
  },
]

function FormNavbar({ user }: { user: User | null }) {
  return (
    <nav className="flex h-12 w-full items-center">
      <div className="flex items-center gap-2">
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
      </div>
      <div className="flex items-center gap-4">
        <Button className="flex h-8 items-center gap-1">
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
