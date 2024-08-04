import React from "react"

import ChangeQuestionType from "./change-question-type"

function FormSettings() {
  return (
    <div className="hidden max-h-full flex-col items-center gap-4 p-2 md:flex">
      <div className="h-full w-60 overflow-hidden rounded-xl bg-forge p-4">
        <div className="flex h-8 gap-4 border-b border-secgraydark text-[14px] font-semibold">
          <div className="cursor-pointer border-b-2 border-black">Question</div>
          {/* <div className="cursor-pointer text-secgray">Design</div> */}
        </div>
        <ChangeQuestionType />
      </div>
    </div>
  )
}

export default FormSettings
