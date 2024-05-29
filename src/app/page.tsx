import Image from "next/image"

import Navbar from "@/components/main/navbar"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <Navbar />
    </main>
  )
}
