import React from "react"
import Image from "next/image"
import { currentUser } from "@clerk/nextjs/server"

import { Button } from "../ui/button"

async function Navbar() {
  const user = await currentUser()
  const email: string = user?.emailAddresses[0].emailAddress ?? ""
  return (
    <nav className="flex h-16 w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" height={30} width={50} alt="logo" />
        <h3 className="text-2xl font-semibold">Typeform</h3>
      </div>
      <div className="p-4 py-8">
        <Button className="rounded-full bg-blue-300">
          {email[0].toUpperCase()}
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
