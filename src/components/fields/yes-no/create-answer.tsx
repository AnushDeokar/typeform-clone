import React from "react"

function YesNoCreateAnswer() {
  return (
    <div className="flex flex-col gap-4 text-[11px]">
      <div className="flex h-8 items-center gap-2 border border-[#0848b0] bg-[#e5ecf7] p-2 text-[#0848b0]">
        <div className="flex aspect-square h-4 w-4 items-center justify-center border border-[#0848b0] bg-white text-[9px]">
          Y
        </div>
        <span>Yes</span>
      </div>
      <div className="flex h-8 items-center gap-2 border border-[#0848b0] bg-[#e5ecf7] p-2 text-[#0848b0]">
        <div className="flex aspect-square h-4 w-4 items-center justify-center border border-[#0848b0] bg-white text-[9px]">
          N
        </div>
        <span>No</span>
      </div>
    </div>
  )
}

export default YesNoCreateAnswer
