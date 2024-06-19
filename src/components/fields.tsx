import dynamic from "next/dynamic"
import { AiOutlineStop } from "react-icons/ai"
import { BsGeoAlt } from "react-icons/bs"
import { CiHashtag, CiMail, CiStar } from "react-icons/ci"
import { FiPhone } from "react-icons/fi"
import { IoIosLink } from "react-icons/io"
import { LuText } from "react-icons/lu"
import { MdOutlineShortText } from "react-icons/md"
import { PiSlideshowFill } from "react-icons/pi"
import { RiArrowDropDownLine } from "react-icons/ri"
import { TbListLetters } from "react-icons/tb"
import { TfiLayoutSliderAlt } from "react-icons/tfi"

const ShortTextSettings = dynamic(() => import("./settings/short-text"))

export const FIELDS = [
  // Text
  {
    type: "SHORT_TEXT",
    name: "Short Text",
    group: "TEXT",
    dataType: "string",
    icon: <MdOutlineShortText />,
    settings: ShortTextSettings,
  },
  {
    type: "LONG_TEXT",
    name: "Short Text",
    group: "TEXT",
    dataType: "string",
    icon: <LuText />,
    settings: ShortTextSettings,
  },

  // Contact info
  {
    type: "PHONE_NUMBER",
    name: "Phone Number",
    group: "CONTACT_INFO",
    dataType: "string",
    icon: <FiPhone />,
    settings: ShortTextSettings,
  },
  {
    type: "EMAIL",
    name: "Email",
    group: "CONTACT_INFO",
    dataType: "email",
    icon: <CiMail />,
    settings: ShortTextSettings,
  },
  {
    type: "ADDRESS",
    name: "Address",
    group: "CONTACT_INFO",
    dataType: "string",
    icon: <BsGeoAlt />,
    settings: ShortTextSettings,
  },
  {
    type: "WEBSITE",
    name: "Website",
    group: "CONTACT_INFO",
    dataType: "url",
    icon: <IoIosLink />,
    settings: ShortTextSettings,
  },

  // Choice
  {
    type: "MULTIPLE_CHOICE",
    name: "Multiple Choice",
    group: "CHOICE",
    dataType: "string",
    icon: <TbListLetters />,
    settings: ShortTextSettings,
  },
  {
    type: "DROPDOWN",
    name: "Dropdown",
    group: "CHOICE",
    dataType: "string",
    icon: <RiArrowDropDownLine />,
    settings: ShortTextSettings,
  },
  {
    type: "YES_NO",
    name: "Yes/No",
    group: "CHOICE",
    dataType: "boolean",
    icon: <AiOutlineStop />,
    settings: ShortTextSettings,
  },

  // Other
  {
    type: "RATING",
    name: "Rating",
    group: "OTHER",
    dataType: "number",
    icon: <CiStar />,
    settings: ShortTextSettings,
  },
  {
    type: "NUMBER",
    name: "Number",
    group: "OTHER",
    dataType: "number",
    icon: <CiHashtag />,
    settings: ShortTextSettings,
  },

  // SCREENS
  {
    type: "WELCOME",
    name: "Welcome Screen",
    group: "SCREEN",
    dataType: "string",
    icon: <TfiLayoutSliderAlt />,
    settings: ShortTextSettings,
  },
  {
    type: "END",
    name: "End Screen",
    group: "SCREEN",
    dataType: "string",
    icon: <PiSlideshowFill />,
    settings: ShortTextSettings,
  },
]

export const QUESTIONTYPES = [
  {
    type: "TEXT",
    name: "Text",
    color: "#afd5f3",
  },
  {
    type: "CONTACT_INFO",
    name: "Contact info",
    color: "#f4d39f",
  },
  {
    type: "CHOICE",
    name: "Choice",
    color: "#e6cef3",
  },
  {
    type: "OTHER",
    name: "Other",
    color: "#edde7d",
  },
  {
    type: "SCREEN",
    name: "Screen",
    color: "#d7d7d6",
  },
]
