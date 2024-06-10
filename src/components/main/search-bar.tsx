"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CiSearch } from "react-icons/ci"
import { HiOutlineDocumentReport } from "react-icons/hi"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command"

function SearchBar() {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <div className="bg-subtle px-4 py-1" onClick={() => setOpen(true)}>
        <div className="inline-flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1 hover:bg-secgraydark">
          <CiSearch size={16} /> Search
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search Forms ..."
          // onValueChange={optimizedFn}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {!isLoading && (
            <>
              {["forms"].map((t, i) => (
                <CommandGroup heading={t} key={i}>
                  {[1, 2, 3, 4, 5].map((blog, ind) => (
                    <CommandItem
                      key={ind}
                      value={ind.toString()}
                      onSelect={() => {
                        runCommand(() => {
                          router.push(`/blog/${ind}`)
                        })
                      }}
                    >
                      <HiOutlineDocumentReport />
                      {blog}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </>
          )}
          {/* {docsConfig.sidebarNav.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href as string));
                  }}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    <CircleIcon className="h-3 w-3" />
                  </div>
                  {navItem.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))} */}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchBar
