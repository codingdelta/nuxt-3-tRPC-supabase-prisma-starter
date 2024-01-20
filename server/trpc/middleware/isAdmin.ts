import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "../createContext";

const t = initTRPC.context<Context>().create();

export default t.middleware(({ next, ctx }) => {
  const { isAdmin, userId, prisma, orgId } = ctx;
  if (!isAdmin) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not an admin.",
    });
  }
  return next();
});
