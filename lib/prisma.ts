import { PrismaClient } from "../lib/generated/prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
};

const prismapg = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prismapg;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prismapg;
