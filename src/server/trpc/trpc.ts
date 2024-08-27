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
import { hashMessage, recoverAddress } from "ethers";
import { sha512 } from "js-sha512";

/**
 * Unprotected procedure
 **/
// .meta<OpenApiMeta>()

const t = initTRPC.context<Context>().create({});

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (
    !ctx.session?.token?.address ||
    !ctx.session?.token?.signedMessage ||
    !ctx.session?.token?.hashedAuthValue
  ) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const verifySignerAddress = recoverAddress(
    hashMessage(ctx.session.token.message),
    ctx.session.token.signedMessage,
  );

  const authValues = {
    message: ctx.session.token.message,
    address: ctx.session.token.address,
    signedMessage: ctx.session.token.signedMessage,
  };

  const checkHashedAuthValues = sha512(
    JSON.stringify(authValues) + (process.env.SECRET_KEY || "its a secret"),
  );

  if (verifySignerAddress != ctx.session.token.address) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (ctx.session.token.hashedAuthValue != checkHashedAuthValues) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const account = ctx.db.account.findFirst({
    where: {
      address: verifySignerAddress,
    },
  });

  if (!account) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  ctx.session.account = { address: verifySignerAddress };

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session },
    },
  });
});

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

export const router = t.router;

export const middleware = t.middleware;
