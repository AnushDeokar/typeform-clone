import React from "react"

interface ToggleSwitchProps {
  isOn: boolean
  onToggle: () => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ${
        isOn ? "bg-black" : "bg-secgraydark"
      }`}
    >
      <div
        className={`h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          isOn ? "translate-x-6" : ""
        }`}
      ></div>
    </div>
  )
}

export default ToggleSwitch
