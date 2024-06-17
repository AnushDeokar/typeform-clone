import React from "react"
import { notFound } from "next/navigation"
import db from "@/db/drizzle"
import { forms } from "@/db/schema"
import { eq } from "drizzle-orm"

import FormDisplay from "@/components/form/form-display"
import FormSettings from "@/components/form/form-settings"
import QuestionsPanel from "@/components/form/questions-panel"

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

async function FormPage({ params }: { params: IFormPage["params"] }) {
  const form = await getFormData(params.formId)
  if (!form) {
    return notFound()
  }
  return (
    <div className="flex w-full grow gap-1 pb-4">
      <QuestionsPanel />
      <FormDisplay />
      <FormSettings />
    </div>
  )
}

export default FormPage
