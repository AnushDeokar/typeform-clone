import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { FaPlus } from "react-icons/fa"

import { createForm } from "@/lib/actions/form"
import { Button } from "@/components/ui/button"

function CreateFormButton({ workspaceId }: { workspaceId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreateForm = async () => {
    setIsLoading(true)
    const response = await createForm({
      workspaceId: workspaceId,
      name: "My new form",
    })
    if (!response.error) {
      router.push(`/form/${response.data?.id}/create`)
    }
    setIsLoading(false)
  }
  return (
    <Button
      className="inline-flex h-8 w-full items-center gap-2 py-1"
      onClick={handleCreateForm}
      disabled={isLoading}
    >
      <FaPlus />
      Create a new form
    </Button>
  )
}

export default CreateFormButton
