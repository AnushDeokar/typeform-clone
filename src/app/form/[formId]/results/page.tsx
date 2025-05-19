import React from "react"
import { notFound } from "next/navigation"
import db from "@/db/drizzle"
import { forms } from "@/db/schema"
import { eq } from "drizzle-orm"
import z from "zod"

import { getQuestionByFormId } from "@/lib/actions/question"
import FormDisplay from "@/components/form/form-display"
import FormPreview from "@/components/form/form-preview"
import FormSettings from "@/components/form/form-settings"
import QuestionsPanel from "@/components/form/questions-panel"

interface IFormPage {
  params: {
    formId: string
  }
}

const formIdSchema = z.string().uuid()

async function getFormData(formId: string) {
  try {
    // Validate formId using Zod
    formIdSchema.parse(formId)

    // Proceed with the query if validation passes
    const form = await db.query.forms.findFirst({
      where: eq(forms.id, formId),
    })

    if (!form) return null
    return form
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.log("Invalid formId: not a valid UUID")
    } else {
      console.log("Error:", e)
    }
    return null
  }
}

async function ResultsPage({ params }: { params: IFormPage["params"] }) {
  const form = await getFormData(params.formId)
  if (!form) {
    return notFound()
  }

  const questions = await getQuestionByFormId(form.id)

  return (
    <div className="flex w-full grow flex-col items-center justify-center gap-4 pb-4">
      <h2 className="text-2xl font-semibold">Results Page</h2>
      <p className="text-gray-500">
        This feature is currently under development. Check back soon!
      </p>
    </div>
  )
}

export default ResultsPage
