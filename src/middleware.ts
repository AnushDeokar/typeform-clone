import { NextResponse } from "next/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/"])
const isAuthRoute = createRouteMatcher(["/signin", "/signup"])
export default clerkMiddleware((auth, req, res) => {
  if (isProtectedRoute(req)) auth().protect()

  const user = auth().userId
  if (isAuthRoute(req) && user) {
    return NextResponse.redirect(`${req.nextUrl.origin}`)
  }
})
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
