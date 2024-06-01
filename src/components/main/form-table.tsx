"use client"

import React from "react"
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

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "../ui/button"

const sortOptions = [
  {
    field: "Date Created",
    icon: <MdOutlineDateRange size={16} />,
  },
  {
    field: "Last Updated",
    icon: <AiOutlineEdit size={16} />,
  },
  {
    field: "Alphabetical",
    icon: <BsSortAlphaDown size={16} />,
  },
]

function FormTable() {
  const [position, setPosition] = React.useState(0)

  const handleValueChange = (val: string) => {
    const index = sortOptions.findIndex((option) => option.field === val)
    if (index !== -1) {
      setPosition(index)
    }
  }

  return (
    <div className="flex grow flex-col rounded-r-lg bg-subtle">
      <div className="p-8">
        <div className="flex justify-between border-b border-secgraydark pb-2">
          <h3 className="text-3xl">Workspace 1</h3>
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
            <Tabs>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="account"
                  className="flex items-center gap-2 rounded-l-md bg-accent px-4 py-1"
                >
                  <CiCircleList /> List
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="flex items-center gap-2 rounded-r-md border-destructive bg-white px-4 py-1"
                >
                  <RxGrid /> Grid
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="px-8 py-2 text-secgray">
        <div className="flex items-center gap-4 text-[12px]">
          <div className="grow"></div>
          <div className="w-24">Responses</div>
          <div className="w-24">Completion</div>
          <div className="w-24">Updated</div>
        </div>
        <div className="mt-4 flex w-full items-center gap-4 rounded-lg border-2 bg-white py-2 hover:shadow-md">
          <div className="flex grow items-center gap-2 px-4 font-semibold text-black">
            <div className="h-8 w-8 rounded-sm bg-blue-700"></div>
            <span>Open-Ended Feedback Survey</span>
          </div>
          <div className="w-24">-</div>
          <div className="w-24">-</div>
          <div className="w-24">26 May 2024</div>
        </div>

        <div className="mt-4 flex w-full items-center gap-4 rounded-lg border-2 bg-white py-2 hover:shadow-md">
          <div className="flex grow items-center gap-2 px-4 font-semibold text-black">
            <div className="h-8 w-8 rounded-sm bg-blue-700"></div>
            <span>Open-Ended Feedback Survey</span>
          </div>
          <div className="w-24">-</div>
          <div className="w-24">-</div>
          <div className="w-24">26 May 2024</div>
        </div>
      </div>
    </div>
  )
}

export default FormTable
