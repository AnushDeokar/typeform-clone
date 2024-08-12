import React from "react"
import { notFound } from "next/navigation"
import db from "@/db/drizzle"
import { forms } from "@/db/schema"
import { eq } from "drizzle-orm"

import { getQuestionByFormId } from "@/lib/actions/question"
import PreviewContent from "@/components/live/live-content"

interface IFormPage {
  params: {
    formId: string
  }
}

async function getFormData(formId: string) {
  const form = db.query.forms.findFirst({
    where: eq(forms.id, formId),
  })

  if (!form) return null
  return form
}

async function LivePage({ params }: { params: IFormPage["params"] }) {
  const form = await getFormData(params.formId)
  if (!form) {
    return notFound()
  }

  const questions = await getQuestionByFormId(form.id)

  return (
    <main>
      <PreviewContent questionList={questions} />
    </main>
  )
}

export default LivePage
