"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { IoLogIn } from "react-icons/io5"

import { Button } from "@/components/ui/button"

function TestSignin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isLoaded, signIn, setActive } = useSignIn()

  if (!isLoaded) {
    // Add logic to handle loading state
    return <div className="h-28"></div>
  }

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await signIn.create({
        identifier: "johnsmithtest@gmail.com",
        password: "JohnSmith@007",
      })
      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId })

        router.push(`${window.location.origin}/`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Button
      variant="outline"
      className="text-light flex rounded-sm"
      onClick={onSubmit}
      disabled={isLoading}
    >
      <IoLogIn size={20} />{" "}
      <span className="flex grow justify-center">Login as a Test User</span>
    </Button>
  )
}

export default TestSignin
