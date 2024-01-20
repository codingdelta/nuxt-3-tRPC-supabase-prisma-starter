import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  // If the request is not an API request, do nothing
  if (!event.path.startsWith("/api/")) return;
  const supabaseClient = await serverSupabaseClient(event);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (session === null) return sendRedirect(event, "/login");

  if (session && session.user) {
    event.context.user = {
      ...session.user,
      roles: session.user.user_metadata.roles,
      isAdmin: session.user.user_metadata.roles.includes("admin"),
    };
  }
});
