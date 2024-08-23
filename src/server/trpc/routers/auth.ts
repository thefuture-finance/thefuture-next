import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { cookies } from "next/headers";
import { sha512 } from "js-sha512";

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        message: z.string().min(1),
        address: z.string().min(1),
        signedMessage: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("login");
      const cookieStore = cookies();

      const hashedAuthValue = sha512(
        JSON.stringify(input) + (process.env.SECRET_KEY || "its a secret"),
      );

      const authValue = {
        message: input.message,
        address: input.address,
        signedMessage: input.signedMessage,
        hashedAuthValue: hashedAuthValue,
      };

      const authToken = JSON.stringify(authValue);

      cookieStore.set("auth", authToken, {
        httpOnly: true,
        sameSite: "strict",
      });

      return;
    }),
});
