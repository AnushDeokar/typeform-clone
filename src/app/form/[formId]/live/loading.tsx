"use client"

import React from "react"
import BarLoader from "react-spinners/BarLoader"

function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col justify-center text-center">
        <span className="text-sm">powered by</span>
        <span className="text-lg font-semibold">Typeform</span>
        <div className="mt-2 w-full">
          <BarLoader />
        </div>
      </div>
    </div>
  )
}

export default Loading
