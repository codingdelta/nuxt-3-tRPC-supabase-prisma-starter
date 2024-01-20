import { inferAsyncReturnType } from "@trpc/server";
import type { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server"; /**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

export const createContext = async (event: H3Event) => {
  const prisma = event.context.prisma;
  const userId: string = event.context.user.id || "";
  const userRoles: string[] = event.context.user.user_metadata.roles || [];
  const orgId: string = event.context.user.orgId || "";
  const isAdmin: boolean = event.context.user.isAdmin || "";
  const supabaseClient = await serverSupabaseClient(event);
  return {
    prisma,
    userId,
    userRoles,
    orgId,
    isAdmin,
    supabaseClient,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
