"use server"

import db from "@/db/drizzle"
import { workspaces, type Workspace } from "@/db/schema"
import { eq } from "drizzle-orm"

import { getErrorMessage } from "../utils"
import { type CreateWorkspaceSchema } from "../validations/workspace"

export const createWorkspace = async (
  input: CreateWorkspaceSchema & { userId: string }
) => {
  try {
    const data = await db.insert(workspaces).values({
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

export const getAllWorkspaces = async (
  userId: string
): Promise<Workspace[]> => {
  let data = await db.query.workspaces.findMany({
    where: eq(workspaces.userId, userId),
  })
  if (data.length === 0) {
    const res = await createWorkspace({ userId, name: "Workspace 1" })
    data = await db.query.workspaces.findMany({
      where: eq(workspaces.userId, userId),
    })
  }
  return data
}
