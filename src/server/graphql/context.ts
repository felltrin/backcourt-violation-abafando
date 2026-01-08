import { type PrismaClient } from "@prisma/client";
import { db } from "../db";

export type Context = {
  db: PrismaClient;
};

export async function createContext(): Promise<Context> {
  return {
    db,
  };
}
