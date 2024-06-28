import React from "react"

import ToggleSwitch from "@/components/ui/toggle-switch"

export default function ShortTextSettings() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span>Required</span>
        <div>
          <ToggleSwitch isOn={false} onToggle={() => {}} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Max Characters</span>
        <div>
          <ToggleSwitch isOn={false} onToggle={() => {}} />
        </div>
      </div>
    </div>
  )
}
