import { prisma } from "@/server/trpc/context";
import { appRouter } from "@/server/trpc/routers";

export const serverClient = appRouter.createCaller({ db: prisma });
