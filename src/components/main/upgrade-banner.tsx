"use client"

import React, { useState } from "react"
import { IoDiamondOutline } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"

import { Button } from "../ui/button"

function UpgradeBanner() {
  const [display, setDisplay] = useState(true)
  return (
    <div
      className={`my-2 w-full ${display ? "flex" : "hidden"} mx-4 h-12 items-center rounded-md px-4`}
      style={{
        backgroundColor: "#fdf9f5",
        border: "2px solid rgb(251 146 60)",
      }}
    >
      <div className="flex grow items-center justify-center gap-2">
        <IoDiamondOutline color="#ae4e09" size={20} />
        <span>
          {" "}
          Hey! Just to let you know you can collect 10 responses this month for
          free.
        </span>
        <Button className="h-6 bg-[#ae4e09] text-xs">Get more Responses</Button>
      </div>
      <RxCross2 onClick={() => setDisplay(false)} />
    </div>
  )
}

export default UpgradeBanner
