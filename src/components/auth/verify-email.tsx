import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import BeatLoader from "react-spinners/BeatLoader"

import { Button } from "../ui/button"
import { Card, CardDescription, CardHeader } from "../ui/card"
import CodeInput from "./code-input"

function VerifyEmailComponent() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmitCode: any = async () => {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code,
      })

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        // TODO: Add user to database
        router.push(`${window.location.origin}/`)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <Card className="flex w-[300px] flex-col gap-4 px-4 py-4">
        <CardHeader className="p-0">
          <CardDescription className="text-[15px] text-black">
            Enter the code sent to your email
          </CardDescription>
        </CardHeader>
        <CodeInput setCode={setCode} />
        <Button className="w-full" type="submit" onClick={handleSubmitCode}>
          {isLoading ? <BeatLoader color="white" /> : "Verify Email"}
        </Button>
      </Card>
    </div>
  )
}

export default VerifyEmailComponent
