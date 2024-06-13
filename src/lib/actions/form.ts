"use server"

import db from "@/db/drizzle"
import { forms, workspaces, type Form } from "@/db/schema"
import { and, eq, ilike } from "drizzle-orm"

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

export const searchForms = async (
  userId: string,
  searchParam: string
): Promise<Form[]> => {
  const data = await db
    .select({
      id: forms.id,
      name: forms.name,
      workspaceId: forms.workspaceId,
      createdAt: forms.createdAt,
      updatedAt: forms.updatedAt,
    })
    .from(forms)
    .innerJoin(workspaces, eq(forms.workspaceId, workspaces.id))
    .where(
      and(ilike(forms.name, `%${searchParam}%`), eq(workspaces.userId, userId))
    )
  return data
}

export const renameForm = async (
  formId: string,
  name: string
): Promise<any> => {
  try {
    const data = await db
      .update(forms)
      .set({ name: name })
      .where(eq(forms.id, formId))
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const deleteFormById = async (formId: string): Promise<any> => {
  try {
    if (!formId) {
      throw new Error("formId not found, please try again.")
    }

    const data = await db.delete(forms).where(eq(forms.id, formId))

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
