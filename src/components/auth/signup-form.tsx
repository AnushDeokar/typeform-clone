"use client"

import React, { useState } from "react"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import BeatLoader from "react-spinners/BeatLoader"
import z from "zod"

import { signupSchema } from "@/lib/validations/authSchema"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import VerifyEmailComponent from "./verify-email"

type FormInputs = z.infer<typeof signupSchema>

function SignupForm() {
  const { isLoaded, signUp } = useSignUp()
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(false)

  const form = useForm<FormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreement: false,
    },
  })

  const onSubmit = async (data: FormInputs) => {
    if (!isLoaded) {
      return
    }

    try {
      setIsLoading(true)
      const nameArr = data.name.split(" ")
      const firstName = nameArr[0]
      const lastName = nameArr.length > 1 ? nameArr.slice(1).join(" ") : ""
      await signUp.create({
        firstName: firstName,
        lastName: lastName,
        emailAddress: data.email,
        password: data.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      setPendingVerification(true)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {!pendingVerification ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="form flex flex-col gap-4"
          >
            `
            <FormField
              name="name"
              control={form.control}
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className="outline-none"
                      {...field}
                      placeholder="Full Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }: { field: any }) => (
                <FormItem>
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
            <div>
              <FormField
                name="password"
                control={form.control}
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormControl className="outline-none">
                      <div className="flex items-center rounded-md border pr-4 focus:border-black focus-visible:ring-2">
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          className="grow border-0 outline-none focus:border-0 focus-visible:ring-0"
                          placeholder="Password"
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

              <FormField
                name="agreement"
                control={form.control}
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormControl className="outline-none">
                      <div className="mt-2 flex gap-2 text-sm text-muted-foreground">
                        <Input
                          type="checkbox"
                          className="h-8 w-8 pt-1"
                          {...field}
                        />
                        <div className="grow">
                          I agree to Typeform&apos;s Terms of Service, Privacy
                          Policy and Data Processing Agreement.
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="outlined mt-2 rounded-md" type="submit">
              {isLoading ? (
                <BeatLoader color="white" size={10} />
              ) : (
                "Create my free account"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <VerifyEmailComponent />
      )}
    </>
  )
}

export default SignupForm
