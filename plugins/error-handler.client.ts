// plugins/error-handler.client.ts
import { TRPCClientError } from "@trpc/client";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vue:error", (error) => {
    if (error instanceof TRPCClientError) {
      useToast().add({
        title: "Error",
        description: error.message,
        color: "red",
      });
    }
  });
});
