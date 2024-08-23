import { inferAsyncReturnType } from "@trpc/server";
import { parse } from "cookie";
import { Prisma, PrismaClient, Account } from "@prisma/client";

import jwt from "jsonwebtoken";

import type { NextApiRequest, NextApiResponse } from "next";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export type SessionType = {
  token?: {
    message: string;
    address: string;
    signedMessage: string;
    hashedAuthValue: string;
  };
  account?: Account;
};

export interface ContextType {
  db: PrismaClient;
  session: SessionType; // req: NextApiRequest;
}

const prisma = new PrismaClient();

function getSession(opts: NextRequest): SessionType {
  try {
    const cookieStore = cookies();
    if (cookieStore?.get("auth")?.value) {
      const authValues = JSON.parse(cookieStore?.get("auth")?.value);
      return { token: authValues };
    }
    return {};
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const createContext = async (opts: NextRequest) => {
  const session = getSession(opts);
  return <ContextType>{
    db: prisma,
    session,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
