"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { BiError } from "react-icons/bi"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import BeatLoader from "react-spinners/BeatLoader"
import z from "zod"

import { signinSchema } from "@/lib/validations/authSchema"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"

type FormInputs = z.infer<typeof signinSchema>

function SigninForm() {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const form = useForm<FormInputs>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  if (!isLoaded) {
    // Add logic to handle loading state
    return (
      <div className="flex h-60 items-center justify-center">
        <Icons.spinner className="size-6 animate-spin" aria-hidden="true" />
      </div>
    )
  }

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true)
    try {
      const res = await signIn.create({
        identifier: data.email,
        password: data.password,
      })
      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId })

        router.push(`${window.location.origin}/`)
      }
    } catch (error) {
      toast.error("Incorrect email or Password!")
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="form flex flex-col gap-4"
        >
          {Object.keys(form.formState.errors).length !== 0 && (
            <div className="flex h-20 gap-2 overflow-hidden rounded-md border">
              <div className="flex h-full flex-col bg-destructive  p-2 pt-2">
                <BiError color="white" />
              </div>
              <div className="p-1 pt-2 text-[13px]">
                We found some errors. Please review the form and make
                corrections.
              </div>
            </div>
          )}
          <FormField
            name="email"
            control={form.control}
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[1100] text-black">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="outline-none"
                    {...field}
                    placeholder="bruce@wayne.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              name="password"
              control={form.control}
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-[1100] text-black">
                    Password
                  </FormLabel>
                  <FormControl className="outline-none">
                    <div className="flex items-center rounded-md border pr-4 focus:border-black focus-visible:ring-2">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        className="grow border-0 outline-none focus:border-0 focus-visible:ring-0"
                        placeholder="Atleast 8 characters"
                        {...field}
                      />
                      {isPasswordVisible ? (
                        <FaRegEyeSlash
                          className="cursor-pointer"
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                        />
                      ) : (
                        <FaRegEye
                          className="cursor-pointer"
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className="mt-2 cursor-pointer text-sm text-muted-foreground underline"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot Password?
            </div>
          </div>
          <Button
            className="outlined mt-2 rounded-md"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <BeatLoader color="white" /> : "Login to Typeform"}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SigninForm
