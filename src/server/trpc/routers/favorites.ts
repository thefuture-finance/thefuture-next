import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const favoritesRouter = router({
  listFavorites: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.favorites.findMany({
      where: { accountId: ctx.session?.account?.address },
    });
  }),
  addFavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.favorites.create({
        data: {
          favoriteId: input.id,
          accountId: ctx.session?.account?.address,
        },
      });
    }),
  removeFavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.favorites.delete({
        where: {
          favoriteId_accountId: {
            favoriteId: input.id,
            accountId: ctx.session?.account?.address,
          },
        },
      });
    }),
});
