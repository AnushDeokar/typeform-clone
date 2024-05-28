import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react"

import { Input } from "@/components/ui/input"

const CodeInput = ({ setCode }: { setCode: (code: string) => void }) => {
  const [code, setCodeState] = useState<string[]>(Array(6).fill(""))
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    const newCode = [...code]

    if (value.length > 1) {
      e.target.value = value[0] // Allow only one digit per box
    }

    newCode[index] = e.target.value
    setCodeState(newCode)

    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus() // Focus on the next input
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputs.current[index - 1]?.focus() // Focus on the previous input
    }
  }

  useEffect(() => {
    setCode(code.join(""))
  }, [code, setCode])

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Input
          key={i}
          type="text"
          maxLength={1}
          className="h-10 w-10 rounded border border-gray-300 text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          // @ts-ignore
          ref={(el) => (inputs.current[i] = el)}
          value={code[i]}
        />
      ))}
    </div>
  )
}

export default CodeInput
