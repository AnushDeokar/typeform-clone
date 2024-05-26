"use client"

import React from "react"
import { useForm } from "react-hook-form"

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

function SigninForm() {
  const form = useForm()
  return (
    <Form {...form}>
      <FormField
        name="email"
        control={form.control}
        render={({ field }: { field: any }) => (
          <FormItem>
            <FormLabel className="text-[16px]">Email</FormLabel>
            <FormControl>
              <Input type="text" className="outline-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="Password"
        control={form.control}
        render={({ field }: { field: any }) => (
          <FormItem>
            <FormLabel className="text-[16px]">Password</FormLabel>
            <FormControl className="outline-none">
              <Input
                type="text"
                className="outline-none"
                placeholder="Atleast 8 characters"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <p className="text-sm text-muted-foreground underline">
        Forgot Password?
      </p>
      <Button className="outlined mt-2 rounded-md">Login to Typeform</Button>
    </Form>
  )
}

export default SigninForm
