import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/server/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies Config;
