"use client"

import React from "react"
import Image from "next/image"
import { useClerk } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/server"

import ProfileButton from "../profile-button"

function HomeNavbarComponent({ user }: { user: User | null }) {
  const { signOut } = useClerk()

  const email: string = user?.emailAddresses[0].emailAddress ?? "A"
  return (
    <nav className="flex h-16 w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" height={25} width={50} alt="logo" />
        <h3 className="text-[20px] font-semibold">Typeform</h3>
      </div>
      <ProfileButton user={user} />
    </nav>
  )
}

export default HomeNavbarComponent
