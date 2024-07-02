"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import BeatLoader from "react-spinners/BeatLoader"
import { z } from "zod"

import { changePasswordSchema } from "@/lib/validations/authSchema"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

type FormInputs = z.infer<typeof changePasswordSchema>

function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()
  const form = useForm<FormInputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  async function onSubmit(data: FormInputs) {
    if (!isLoaded) return

    setIsLoading(true)

    try {
      const attemptFirstFactor = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      })

      if (attemptFirstFactor.status === "complete") {
        await setActive({
          session: attemptFirstFactor.createdSessionId,
        })
        router.push(`${window.location.origin}/`)
        toast.success("Password reset successfully.")
      } else {
        console.error(attemptFirstFactor)
      }
    } catch (err) {
      toast.error("Incorrect OTP!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="form mt-8 flex flex-col gap-4"
      >
        <FormField
          name="password"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className="w-32 text-[16px] font-[1100] text-black">
                Enter New Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="outline-none"
                  {...field}
                  placeholder="Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-32 text-[16px] font-[1100] text-black">
                Enter OTP
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  {/* <InputOTPGroup> */}
                  <InputOTPSlot index={0} className="border border-r-2" />
                  <InputOTPSlot index={1} className="border border-r-2" />
                  <InputOTPSlot index={2} className="border border-r-2" />
                  <InputOTPSlot index={3} className="border border-r-2" />
                  <InputOTPSlot index={4} className="border border-r-2" />
                  <InputOTPSlot index={5} className="border border-r-2" />
                  {/* </InputOTPGroup> */}
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the 6-digit code sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="outlined mt-2 rounded-sm"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <BeatLoader color="white" /> : "Change Password"}
        </Button>
      </form>
    </Form>
  )
}

export default ChangePasswordForm
