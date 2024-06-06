import { isClerkAPIResponseError } from "@clerk/nextjs/errors"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    return err.errors[0]?.message ?? "Unkown Error"
  } else if (isClerkAPIResponseError(err)) {
    return err.errors[0]?.longMessage ?? "Unkown Error"
  } else if (err instanceof Error) {
    return err.message
  } else {
    return "Unkown Error"
  }
}
