import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Ensure writable SQLite database on serverless platforms (e.g. Vercel)
if (process.env.VERCEL && (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith("file:"))) {
  const tmpDbPath = "/tmp/dev.db";
  const sourceDbPath = path.join(process.cwd(), "prisma", "dev.db");
  try {
    if (!fs.existsSync(tmpDbPath) && fs.existsSync(sourceDbPath)) {
      fs.copyFileSync(sourceDbPath, tmpDbPath);
    }
    process.env.DATABASE_URL = `file:${tmpDbPath}`;
  } catch (err) {
    console.error("Failed to copy SQLite database to /tmp for Vercel:", err);
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

