import { inferAsyncReturnType } from "@trpc/server";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

import type { NextApiRequest, NextApiResponse } from "next";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export interface ContextType {
  // session: { user: Partial<User> };
  req: NextApiRequest;
  res: NextApiResponse;
}

// function getSession(opts: H3Event<h3.EventHandlerRequest>): {
//   // user: Partial<User>;
// } {
//   try {
//     const cookie = parse(opts?.req?.headers?.cookie);
//     const parsedToken: jwt.Jwt = jwt.verify(
//       cookie.token,
//       process.env.VITE_JWT_SECURITY ?? "SECRET",
//       { complete: true },
//     );
//
//     return { user: { userName: parsedToken?.payload?.username } };
//   } catch (err) {
//     return { user: {} };
//   }
// }

export const createContext = async (opts: any) => {
  // const session = getSession(opts);
  console.log(typeof opts);
  console.log(opts);
  return {};
  return <ContextType>{
    // session,
    req: opts.req,
    res: opts.res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
