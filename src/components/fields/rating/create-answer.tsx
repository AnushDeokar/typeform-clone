"use client"

import React, { useState } from "react"
import { IoIosStarOutline } from "react-icons/io"

function CreateAnswer() {
  const [starsCount, setStarsCount] = useState(7)

  return (
    <div className={`flex w-full text-xl text-[#0848b0]`}>
      {Array.from({ length: starsCount }, (_, index) => (
        <div key={index} className="flex flex-col items-center">
          <IoIosStarOutline
            color="#0848b0"
            size={starsCount > 5 ? Math.max((10 - starsCount) * 10, 25) : 40}
          />
          <span className="text-[10px]">{index + 1}</span>
        </div>
      ))}
    </div>
  )
}

export default CreateAnswer
