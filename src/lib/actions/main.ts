"use server";

import db from "@/db/drizzle";
import { forms, workspaces } from "@/db/schema";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { z } from "zod";





function getErrorMessage(err: unknown) {
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

export const createWorkspace = async (input: any) => {
  try {
    const data = await db
      .insert(workspaces)
      .values({
        userId: input.userId,
        name: input.name,
      })

      return {
      data: data,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export const createForm = async (input: any) => {
  try {
    const data = await db
      .insert(forms)
      .values({
        workspaceId: input.workspaceId,
        name: input.name,
      })
      .returning({ id: forms.id }) 

    return {
      data: data[0],
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: "Error Occured!",
    }
  }
}