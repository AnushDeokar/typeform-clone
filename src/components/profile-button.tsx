import React from "react"
import { useClerk } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/server"
import { IoOpenOutline } from "react-icons/io5"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ProfileButton({ user }: { user: User | null }) {
  const { signOut } = useClerk()

  const email: string = user?.emailAddresses[0].emailAddress ?? "A"
  return (
    <div className="p-4 py-8">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-8 rounded-full bg-blue-300 outline-none hover:bg-blue-400">
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
          <DropdownMenuItem>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/AnushDeokar/typeform-clone"
              className="flex items-center gap-2"
            >
              {" "}
              Github <IoOpenOutline />
            </a>
          </DropdownMenuItem>
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
  )
}

export default ProfileButton
