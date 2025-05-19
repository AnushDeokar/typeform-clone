"use client"

import React, { useState } from "react"
import { IoDiamondOutline } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"

import { Button } from "@/components/ui/button"

function UpgradeBanner() {
  const [display, setDisplay] = useState(true)
  return (
    <div
      className={`my-2 w-full ${display ? "flex" : "hidden"} mx-4 h-12 items-center rounded-md px-4`}
      style={{
        backgroundColor: "rgb(247, 251, 250)",
        boxShadow:
          "rgb(155, 203, 196) 0px 0px 0px 1px inset, rgba(155, 203, 196, 0.2) 0px 0px 0px 2px",
      }}
    >
      <div className="flex grow items-center justify-center gap-2">
        <IoDiamondOutline color="rgb(23, 119, 103)" size={20} />
        <span>
          {" "}
          Hey! Just to let you know you can collect 10 responses this month for
          free.
        </span>
        <Button className="bg-[rgb(23, 119, 103)] hover:bg-[rgb(23, 119, 103)] h-6 text-xs">
          Get more Responses
        </Button>
      </div>
      <RxCross2 onClick={() => setDisplay(false)} />
    </div>
  )
}

export default UpgradeBanner
