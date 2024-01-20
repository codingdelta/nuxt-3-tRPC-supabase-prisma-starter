import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { userRouter } from "./userRouter/userRouter";

export const appRouter = router({
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
