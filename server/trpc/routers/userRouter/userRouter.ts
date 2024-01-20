import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import { createClient } from "@supabase/supabase-js";

export const userRouter = router({
  getSelf: publicProcedure.query(async ({ ctx, input }) => {
    const { prisma, userId } = ctx;
    try {
      const user = await prisma.userProfile.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Error getting user profile",
      });
    }
  }),
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const supabase = createClient(
        useRuntimeConfig().supabaseUrl,
        useRuntimeConfig().supabaseServiceKey
      );

      try {
        const { data, error } = await supabase.auth.admin.createUser({
          email: input.email,
          password: input.password,
          user_metadata: {
            roles: ["user"],
          },
        });
      } catch (error) {}

      try {
        const user = await prisma.user.create({
          data: {
            email: input.email,
            name: input.name,
          },
        });
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Error creating user profile",
        });
      }
    }),
});
