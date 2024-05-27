"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { BiError } from "react-icons/bi"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import z from "zod"

import { signinSchema } from "@/lib/validations/authSchema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "../ui/button"

type FormInputs = z.infer<typeof signinSchema>

function SigninForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const form = useForm<FormInputs>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: FormInputs) => {
    setIsLoading(true)
    console.log(data)
  }

  return (
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
              We found some errors. Please review the form and make corrections.
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
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    ) : (
                      <FaRegEye
                        className="cursor-pointer"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="mt-2 text-sm text-muted-foreground underline">
            Forgot Password?
          </p>
        </div>
        <Button
          className="outlined mt-2 rounded-md"
          type="submit"
          disabled={isLoading}
        >
          Login to Typeform
        </Button>
      </form>
    </Form>
  )
}

export default SigninForm
