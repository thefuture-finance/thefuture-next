import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { isAddress } from "ethers";
import { TRPCError } from "@trpc/server";

export const userInfoRouter = router({
  getUserRecentlySearch: protectedProcedure.query(async () => {
    return "Hello World " + Date.now();
  }),
  removeAllRecentSearch: protectedProcedure.mutation(async () => {
    return "Hello World " + Date.now();
  }),
  removeRecentSearchById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async () => {
      return "Hello World " + Date.now();
    }),
  addRecentSearch: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string().refine((value) => isAddress(value), {
          message:
            "Provided address is invalid. Please insure you have typed correctly.",
        }),
      }),
    )
    .mutation(async () => {
      return "Hello World " + Date.now();
    }),

  addAccount: protectedProcedure
    .input(
      z.object({
        address: z.string(),
        chainId: z.string(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("sss");
      console.log(input);

      await ctx.db.smartAccount.create({
        data: {
          address: input.address,
          authorAccountAddress: ctx.session.account.address,
          chainId: input?.chainId?.toString() || "534351",
        },
      });

      return;
    }),

  getAccounts: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.id != ctx.session.account.address) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const account = await ctx.db.account.findUnique({
        where: {
          address: input.id,
        },
        include: { accounts: true },
      });

      console.log(account);

      const accounts =
        account.accounts.map((account) => {
          return {
            address: account.address,
            chainId: account.chainId,
            name: "",
          };
        }) || [];

      return accounts;
    }),
});
