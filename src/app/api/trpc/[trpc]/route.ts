import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/trpc/routers";
import { createContext } from "@/server/trpc/context";

const handler = async (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    onError(opts) {
      const { error, type, path, input, ctx, req } = opts;
      // console.error("Error:", error);
      if (error.code === "INTERNAL_SERVER_ERROR") {
        // send to bug reporting
      }
    },
    createContext,
  });

export { handler as GET, handler as POST };
