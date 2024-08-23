import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const favoritesRouter = router({
  listFavorites: protectedProcedure.query(async () => {
    return "Hello World " + Date.now();
  }),
  addFavorite: protectedProcedure.input(z.object({})).mutation(async () => {
    return "Hello World " + Date.now();
  }),
  removeFavorite: protectedProcedure.input(z.object({})).mutation(async () => {
    return "Hello World " + Date.now();
  }),
});
