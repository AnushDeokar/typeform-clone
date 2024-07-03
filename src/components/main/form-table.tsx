"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Form, Workspace } from "@/db/schema"
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { ChevronDownIcon } from "lucide-react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsSortAlphaDown } from "react-icons/bs"
import { CiCircleList } from "react-icons/ci"
import { MdOutlineDateRange } from "react-icons/md"
import { RxGrid } from "react-icons/rx"

import { getFormsByWorkspaceId } from "@/lib/actions/form"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

import CreateFormButton from "./create-form-button"
import FormActionsComponent from "./form-actions"

const sortOptions = [
  {
    key: "createdAt",
    field: "Date Created",
    icon: <MdOutlineDateRange size={16} />,
  },
  {
    key: "updatedAt",
    field: "Last Updated",
    icon: <AiOutlineEdit size={16} />,
  },
  {
    key: "name",
    field: "Alphabetical",
    icon: <BsSortAlphaDown size={16} />,
  },
]

const formatDate = (dateString: Date | null) => {
  if (!dateString) return "-"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function FormTable({ selectedWorkspace }: { selectedWorkspace: Workspace }) {
  const router = useRouter()
  const [position, setPosition] = React.useState(0)
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState(true)
  const [displayMode, setDisplayMode] = useState("list")

  const handleValueChange = (val: string) => {
    const index = sortOptions.findIndex((option) => option.field === val)
    if (index !== -1) {
      setPosition(index)
      // sort form based on sortoption
      sortForms(sortOptions[index].key)
    }
  }

  const sortForms = (key: string) => {
    const sortedForms = [...forms].sort((a, b) => {
      if (key === "name") {
        return a[key].localeCompare(b[key])
      }
      // @ts-ignore
      return new Date(a[key]).getTime() - new Date(b[key]).getTime()
    })
    setForms(sortedForms)
  }

  useEffect(() => {
    const fetchForms = async () => {
      const data = await getFormsByWorkspaceId(selectedWorkspace.id)
      setForms(data)
      setLoading(false)
    }
    fetchForms()
  }, [selectedWorkspace.id])

  return (
    <div className="flex grow flex-col rounded-r-lg bg-subtle">
      <div className="p-8">
        <div className="flex justify-between border-b border-secgraydark pb-2">
          <h3 className="text-3xl">{selectedWorkspace.name}</h3>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="outline-none">
                <Button
                  variant="outline"
                  className="ml-auto flex items-center gap-2"
                >
                  {sortOptions[position].icon}
                  <span style={{ lineHeight: "1" }}>
                    {sortOptions[position].field}
                  </span>
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup
                  value={sortOptions[position].field}
                  onValueChange={handleValueChange}
                  className="flex flex-col gap-1 p-1"
                >
                  {sortOptions.map((option, index) => (
                    <DropdownMenuRadioItem
                      key={index}
                      value={option.field}
                      className="flex cursor-pointer items-center gap-2 rounded-md p-2 outline-none hover:bg-subtle"
                    >
                      {option.icon} {option.field}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Tabs onValueChange={(val) => setDisplayMode(val)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="list"
                  className={`flex items-center gap-2 rounded-l-md border-destructive px-4 py-1 ${displayMode === "list" ? "bg-accent" : "bg-white"}`}
                >
                  <CiCircleList /> List
                </TabsTrigger>
                <TabsTrigger
                  value="grid"
                  className={`flex items-center gap-2 rounded-r-md border-destructive px-4 py-1 ${displayMode === "grid" ? "bg-accent" : "bg-white"}`}
                >
                  <RxGrid /> Grid
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      {forms.length > 0 || loading ? (
        <div className="px-8 py-2 text-secgray">
          {displayMode === "list" && forms.length > 0 && (
            <div className="flex items-center gap-4 text-[12px]">
              <div className="grow"></div>
              <div className="w-24 text-center">Responses</div>
              <div className="w-24 text-center">Completion</div>
              <div className="w-24 text-center">Updated</div>
              <div className="w-12"></div>
            </div>
          )}
          {loading ? (
            <>
              <Skeleton className="mt-4 flex h-12 w-full items-center gap-4 rounded-lg border-2  bg-white py-2 hover:shadow-md" />
              <Skeleton className="mt-4 flex h-12 w-full items-center gap-4 rounded-lg border-2 bg-white py-2 hover:shadow-md" />
              <Skeleton className="mt-4 flex h-12 w-full items-center gap-4 rounded-lg border-2 bg-white py-2 hover:shadow-md" />
            </>
          ) : forms.length > 0 && displayMode === "list" ? (
            forms.map((form) => (
              <div
                className="mt-4 flex w-full cursor-pointer items-center gap-4 rounded-lg border-2 bg-white py-2 hover:shadow-md"
                key={form.id}
              >
                <div
                  className="flex grow items-center gap-2 px-4 font-semibold text-black"
                  onClick={() => router.push(`/form/${form.id}/create`)}
                >
                  <div className="h-8 w-8 rounded-sm bg-blue-700"></div>
                  <span>{form.name}</span>
                </div>
                <div className="w-24 text-center">-</div>
                <div className="w-24 text-center">-</div>
                <div className="w-24 text-center">
                  {formatDate(form.createdAt)}
                </div>
                <FormActionsComponent
                  form={form}
                  setForms={setForms}
                  forms={forms}
                />
              </div>
            ))
          ) : (
            forms.length > 0 &&
            displayMode === "grid" && (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
                {forms.map((form) => (
                  <div
                    className="mt-4  flex h-52 w-full cursor-pointer flex-col gap-2 rounded-lg border-2 bg-white px-4 py-4 hover:shadow-md"
                    key={form.id}
                  >
                    <div className="grow"></div>
                    <div className="font-semibold text-black ">{form.name}</div>
                    <div className="w-24">{formatDate(form.createdAt)}</div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      ) : (
        !loading && (
          <div className="mt-32 flex h-full w-full justify-center text-2xl font-bold">
            <div className="flex flex-col gap-4">
              <p> No forms in this workspace</p>
              <CreateFormButton workspaceId={selectedWorkspace.id} />
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default FormTable
