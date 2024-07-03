"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import BeatLoader from "react-spinners/BeatLoader"
import { z } from "zod"

import { forgotPasswordSchema } from "@/lib/validations/authSchema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

type FormInputs = z.infer<typeof forgotPasswordSchema>

function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { isLoaded, signIn } = useSignIn()
  const form = useForm<FormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: FormInputs) => {
    if (!isLoaded) {
      return
    }
    setIsLoading(true)
    try {
      const firstFactor = await signIn.create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      })

      if (firstFactor.status === "needs_first_factor") {
        router.push("/forgot-password/confirm")
        toast.success("Link copied to clipboard", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="form mt-8 flex flex-col gap-4"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className="w-32 text-[16px] font-[1100] text-black">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="outline-none"
                  {...field}
                  placeholder="Email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="font-[350]">
          Type the address linked to your account and we&apos;ll send you
          password reset instructions.
        </div>
        <Button
          className="outlined mt-2 rounded-sm"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <BeatLoader color="white" /> : "Send Instructions"}
        </Button>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm
