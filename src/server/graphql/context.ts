import { type PrismaClient } from "generated/prisma/client";
import { db } from "../db";

export type Context = {
  db: PrismaClient;
};

export async function createContext(): Promise<Context> {
  return {
    db,
  };
}
