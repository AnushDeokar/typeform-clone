"use client"

import React from "react"
import Image from "next/image"
import { useClerk } from "@clerk/nextjs"
import { currentUser, User } from "@clerk/nextjs/server"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function MainHeaderComponent({ user }: { user: User | null }) {
  const { signOut } = useClerk()

  const email: string = user?.emailAddresses[0].emailAddress ?? ""
  return (
    <nav className="flex h-16 w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" height={25} width={50} alt="logo" />
        <h3 className="text-[20px] font-semibold">Typeform</h3>
      </div>

      <div className="p-4 py-8">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 rounded-full bg-blue-300 hover:bg-blue-400">
            <span className="m-auto">{email[0].toUpperCase()}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-4">
                <div className="tex-light flex h-8 w-8 items-center justify-center rounded-full bg-blue-300 text-center hover:bg-blue-400">
                  {email[0].toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">
                    {user?.firstName}&nbsp;{user?.lastName}
                  </p>
                  <p className="font-normal">{email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut({ redirectUrl: "/signin" })}
              className="text-destructive hover:text-destructive"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default MainHeaderComponent
