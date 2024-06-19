import React from "react"
import { FiPlus } from "react-icons/fi"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FIELDS, QUESTIONTYPES } from "../fields"
import { Button } from "../ui/button"

function AddContentDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="flex h-8 items-center gap-2">
          <FiPlus />
          <span>Add content</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[800px] bg-forge">
        <DialogHeader>
          <DialogTitle className="mb-4">Add Content</DialogTitle>
          <div className="mt-4 grid grid-cols-1 gap-8 rounded-lg bg-white p-4 text-sm md:grid-cols-2 lg:grid-cols-3">
            {QUESTIONTYPES.map((t) => (
              <div className="flex flex-col gap-2" key={t.name}>
                <h4 className="font-semibold">{t.name}</h4>
                {FIELDS.filter((f) => f.group === t.type).map((f, i) => (
                  <div
                    className="flex cursor-pointer items-center gap-4 rounded-md p-2 text-secgray hover:bg-secgraydark"
                    key={i}
                  >
                    <div
                      className="flex aspect-square w-6 items-center justify-center rounded-md"
                      style={{ backgroundColor: t.color }}
                    >
                      {f.icon}
                    </div>
                    <span>{f.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddContentDialog
