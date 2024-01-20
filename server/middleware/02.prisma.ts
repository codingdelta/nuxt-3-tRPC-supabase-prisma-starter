import { PrismaClient } from "@prisma/client";

declare module "h3" {
  interface H3EventContext {
    prisma: PrismaClient;
  }
}

// let prisma: PrismaClient;

export default defineEventHandler(async (event) => {
  // If the request is not an API request, do nothing
  if (!event.path.startsWith("/api/")) return;

  // add Prisma to the context so we can use it in our tRPC handlers
  event.context.prisma = prisma;
});
