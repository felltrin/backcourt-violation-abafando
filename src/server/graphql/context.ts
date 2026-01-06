// import { type PrismaClient } from "@prisma/client";
import { type PrismaClient } from "generated/prisma/client";
import { prisma } from "../../lib/prisma";

export type Context = {
  prisma: PrismaClient;
};

export async function createContext(): Promise<Context> {
  return {
    prisma,
  };
}
