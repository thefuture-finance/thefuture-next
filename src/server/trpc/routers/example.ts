import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const exampleRouter = router({
  sayHelloWorld: publicProcedure.query(async () => {
    return "Hello World " + Date.now();
  }),
});
