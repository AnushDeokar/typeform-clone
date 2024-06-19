import dynamic from "next/dynamic"
import { LuText } from "react-icons/lu"
import { MdOutlineShortText } from "react-icons/md"

const ShortTextSettings = dynamic(() => import("./settings/short-text"))

export const FIELDS = [
  {
    type: "SHORT_TEXT",
    name: "Short Text",
    group: "text",
    dataType: "string",
    icon: <MdOutlineShortText />,
    settings: ShortTextSettings,
  },
  {
    type: "LONG_TEXT",
    name: "Short Text",
    group: "text",
    dataType: "string",
    icon: <LuText />,
    settings: ShortTextSettings,
  },
]
