"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Form } from "@/db/schema"
import { CiSearch } from "react-icons/ci"
import { HiOutlineDocumentReport } from "react-icons/hi"

import { searchForms } from "@/lib/actions/form"
import { cn } from "@/lib/utils"
import useDebounce from "@/hooks/use-debounce"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"

function SearchBar({ userId }: { userId: string }) {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchParam, setSearchParam] = useState<string>("")
  const debouncedSearchParam = useDebounce(searchParam, 2000)
  const [forms, setForms] = useState<Form[]>([])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      if (debouncedSearchParam.length >= 1) {
        const data = await searchForms(userId, debouncedSearchParam)
        setForms(data)
      } else {
        setForms([])
      }
      setIsLoading(false)
    }

    fetchData()
  }, [debouncedSearchParam, userId])

  return (
    <>
      <div className="bg-subtle px-4 py-1" onClick={() => setOpen(true)}>
        <div className="inline-flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1 hover:bg-secgraydark">
          <CiSearch size={16} /> Search
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={searchParam}
          placeholder="Search Forms ..."
          onValueChange={(v) => {
            setIsLoading(true)
            setSearchParam(v)
          }}
          className="w-40 border-none"
        />
        <CommandList className="w-full">
          {searchParam && !isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {isLoading && (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          )}
          {!isLoading && forms.length > 0 && (
            <>
              {["forms"].map((t, i) => (
                <CommandGroup heading={t} key={i}>
                  {forms.map((form, ind) => (
                    <CommandItem
                      key={form.id}
                      value={form.name.toString()}
                      onSelect={() => {
                        runCommand(() => {
                          router.push(`/form/${form.id}/create`)
                        })
                      }}
                      className="hover:bg-red mx-1 my-2 cursor-pointer bg-white"
                    >
                      <HiOutlineDocumentReport />
                      {form.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchBar
