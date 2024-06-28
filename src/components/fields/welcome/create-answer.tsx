import React from "react"

import { Button } from "@/components/ui/button"

function WelcomeCreateAnswer() {
  return (
    <div className="flex justify-center">
      <Button
        className="m-auto w-24 bg-[#0848b0] text-center text-white hover:bg-[#0848b0]/90"
        style={{ textUnderlineOffset: "8px" }}
      >
        Start
      </Button>
    </div>
  )
}

export default WelcomeCreateAnswer
