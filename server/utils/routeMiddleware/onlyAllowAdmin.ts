export default defineRequestMiddleware((event) => {
  if (!event.context.user.isAdmin) {
    throw createError({ statusMessage: "You are not authorized to access this resource", statusCode: 401 });
  }
});
