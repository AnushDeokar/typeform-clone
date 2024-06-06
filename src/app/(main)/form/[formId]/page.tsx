import React from "react"
import { notFound } from "next/navigation"
import db from "@/db/drizzle"
import { forms } from "@/db/schema"
import { eq } from "drizzle-orm"

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
  return <div>{form.name}</div>
}

export default FormPage
