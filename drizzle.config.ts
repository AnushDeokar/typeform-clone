import "dotenv/config"

import { defineConfig } from "drizzle-kit"

console.log("env", process.env.NEON_DATABASE_URL!)
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
})
