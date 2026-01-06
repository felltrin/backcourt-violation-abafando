import { prisma } from "../../lib/prisma";

export type Context = {
  prisma: typeof prisma;
};

export async function createContext(): Promise {
  return {
    prisma,
  };
}
