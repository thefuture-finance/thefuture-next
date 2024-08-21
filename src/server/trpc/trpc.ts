import superjson from "superjson";
/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";
// import { OpenApiMeta } from "trpc-openapi";
import { User } from "../models/User";

/**
 * Unprotected procedure
 **/

const t = initTRPC
  .context<Context>()
  // .meta<OpenApiMeta>()
  .create({});

// const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
//   if (!ctx.session?.user?.userName) {
//     throw new TRPCError({ code: "UNAUTHORIZED" });
//   }
//
//   const user = await ctx.db
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .where("user.userName = :userName", {
//       userName: ctx.session.user.userName,
//     })
//     .getOne();
//
//   if (!user) {
//     throw new TRPCError({ code: "UNAUTHORIZED" });
//   }
//
//   return next({
//     ctx: {
//       // infers the `session` as non-nullable
//       session: { ...ctx.session, user },
//     },
//   });
// });

export const publicProcedure = t.procedure;

// export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

export const router = t.router;

export const middleware = t.middleware;
