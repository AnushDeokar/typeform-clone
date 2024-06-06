"use server"

import db from "@/db/drizzle"
import { forms, type Form } from "@/db/schema"
import { eq } from "drizzle-orm"

import { getErrorMessage } from "../utils"

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
      error: getErrorMessage(err),
    }
  }
}

export const getFormsByWorkspaceId = async (
  workspaceId: string
): Promise<Form[]> => {
  const data = await db.query.forms.findMany({
    where: eq(forms.workspaceId, workspaceId),
  })

  return data
}
