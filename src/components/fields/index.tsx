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
import { z } from "zod"

const ShortTextSettings = dynamic(() => import("./short-text/settings"))
const ShortTextCreateAnswer = dynamic(
  () => import("./short-text/create-answer")
)

const EmailCreateAnswer = dynamic(() => import("./email/create-answer"))

const WebsiteCreateAnswer = dynamic(() => import("./website/create-answer"))

const RatingCreateAnswer = dynamic(() => import("./rating/create-answer"))

const YesNoCreateAnswer = dynamic(() => import("./yes-no/create-answer"))

const WelcomeCreateAnswer = dynamic(() => import("./welcome/create-answer"))

export const FIELDS = [
  // Text
  {
    type: "SHORT_TEXT",
    name: "Short Text",
    group: "TEXT",
    dataType: "string",
    icon: <MdOutlineShortText />,
    settings: ShortTextSettings,
    createAnswer: ShortTextCreateAnswer,
  },
  {
    type: "LONG_TEXT",
    name: "Long Text",
    group: "TEXT",
    dataType: "string",
    icon: <LuText />,
    settings: ShortTextSettings,
    createAnswer: ShortTextCreateAnswer,
  },

  // Contact info
  {
    type: "PHONE_NUMBER",
    name: "Phone Number",
    group: "CONTACT_INFO",
    dataType: "string",
    icon: <FiPhone />,
    settings: ShortTextSettings,
    createAnswer: ShortTextCreateAnswer,
  },
  {
    type: "EMAIL",
    name: "Email",
    group: "CONTACT_INFO",
    dataType: "email",
    icon: <CiMail />,
    settings: ShortTextSettings,
    createAnswer: EmailCreateAnswer,
  },
  {
    type: "ADDRESS",
    name: "Address",
    group: "CONTACT_INFO",
    dataType: "string",
    icon: <BsGeoAlt />,
    settings: ShortTextSettings,
    createAnswer: ShortTextCreateAnswer,
  },
  {
    type: "WEBSITE",
    name: "Website",
    group: "CONTACT_INFO",
    dataType: "url",
    icon: <IoIosLink />,
    settings: ShortTextSettings,
    createAnswer: WebsiteCreateAnswer,
  },

  // Choice
  {
    type: "MULTIPLE_CHOICE",
    name: "Multiple Choice",
    group: "CHOICE",
    dataType: "string",
    icon: <TbListLetters />,
    settings: ShortTextSettings,
    createAnswer: ShortTextCreateAnswer,
  },
  {
    type: "DROPDOWN",
    name: "Dropdown",
    group: "CHOICE",
    dataType: "string",
    icon: <RiArrowDropDownLine />,
    settings: ShortTextSettings,
    createAnswer: ShortTextCreateAnswer,
  },
  {
    type: "YES_NO",
    name: "Yes/No",
    group: "CHOICE",
    dataType: "boolean",
    icon: <AiOutlineStop />,
    settings: ShortTextSettings,
    createAnswer: YesNoCreateAnswer,
  },

  // Other
  {
    type: "RATING",
    name: "Rating",
    group: "OTHER",
    dataType: "number",
    icon: <CiStar />,
    settings: ShortTextSettings,
    createAnswer: RatingCreateAnswer,
  },
  {
    type: "NUMBER",
    name: "Number",
    group: "OTHER",
    dataType: "number",
    icon: <CiHashtag />,
    settings: ShortTextSettings,
    createAnswer: ShortTextCreateAnswer,
  },

  // SCREENS
  {
    type: "WELCOME",
    name: "Welcome Screen",
    group: "SCREEN",
    dataType: "string",
    icon: <TfiLayoutSliderAlt />,
    settings: ShortTextSettings,
    createAnswer: WelcomeCreateAnswer,
  },
  {
    type: "END",
    name: "End Screen",
    group: "SCREEN",
    dataType: "string",
    icon: <PiSlideshowFill />,
    settings: ShortTextSettings,
    createAnswer: ShortTextCreateAnswer,
  },
]

export const FIELD_TYPES = [
  "SHORT_TEXT",
  "LONG_TEXT",
  "PHONE_NUMBER",
  "EMAIL",
  "ADDRESS",
  "WEBSITE",
  "MULTIPLE_CHOICE",
  "DROPDOWN",
  "YES_NO",
  "RATING",
  "NUMBER",
  "WELCOME",
  "END",
] as const
type fieldTypekey = (typeof FIELD_TYPES)[number]
export const TYPE_OF_FIELDS: z.ZodType<fieldTypekey> = z.enum(FIELD_TYPES)

export const QUESTION_TYPES = [
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
    color: "#a8e6bd",
  },
  {
    type: "SCREEN",
    name: "Screen",
    color: "#d7d7d6",
  },
]
