import React from "react"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"

function GithubLink() {
  return (
    <div className="fixed bottom-2 flex justify-between px-4 text-[10px]">
      <Link
        href="https://github.com/AnushDeokar"
        className="flex items-center gap-1"
      >
        Built By Anush
        <FaGithub size={16} />
        <span className="text-[10px]"></span>
      </Link>
    </div>
  )
}

export default GithubLink
