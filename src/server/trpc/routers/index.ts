import { router } from "../trpc";
import { authRouter } from "./auth";
import { favoritesRouter } from "./favorites";
import { userInfoRouter } from "./userInfo";

export const appRouter = router({
  favoritesRouter: favoritesRouter,
  userInfoRouter: userInfoRouter,
  authRouter: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
