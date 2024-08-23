import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { isAddress } from "ethers";

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
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async () => {
      return "Hello World " + Date.now();
    }),

  getAccounts: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log(input.id);
      return [
        { address: "0xe3E05A1bDfdA3785e363071384B973a86d704ae7", name: "asd" },

        { address: "0xd6241489026aD9043097E1EdEBBc6A34f7d95fc4", name: "asd" },
      ];
    }),
});
