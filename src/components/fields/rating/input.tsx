"use client"

import React, { useState } from "react"
import { IoIosStarOutline } from "react-icons/io"
import { IoStar } from "react-icons/io5"

import { Button } from "@/components/ui/button"

function RatingInput({ onSubmit }: { onSubmit: (v: string) => void }) {
  const [starsCount, setStarsCount] = useState(7)
  const [filled, setFilled] = useState(0)

  return (
    <div className="my-4 flex flex-col gap-1">
      <div className={`flex w-full text-xl text-[#010101]`}>
        {Array.from({ length: starsCount }, (_, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            onClick={() => setFilled(index + 1)}
          >
            {filled > index ? (
              <IoStar
                color="#0848b0"
                size={
                  starsCount > 5 ? Math.max((10 - starsCount) * 10, 25) : 40
                }
              />
            ) : (
              <IoIosStarOutline
                color="#0848b0"
                size={
                  starsCount > 5 ? Math.max((10 - starsCount) * 10, 25) : 40
                }
              />
            )}
            <span className="text-[10px]">{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <Button
          className="h-10 rounded-md bg-[#104eb3] text-lg text-white hover:bg-[#104eb3]/80"
          onClick={() => onSubmit(filled.toString())}
        >
          OK
        </Button>
      </div>
    </div>
  )
}

export default RatingInput
