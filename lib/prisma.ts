import { PrismaClient } from "../lib/generated/prisma/client";

declare global {
  // Ensure global type doesn't conflict
  var prismaGlobal: PrismaClient | undefined;
}

const prismapg = global.prismaGlobal ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prismapg;
}

export default prismapg;
