import type { User } from "@supabase/supabase-js";

export const useUserStore = defineStore("user", () => {
  const { $client } = useNuxtApp();
  const user = ref(useSupabaseUser());
  const roles: Ref<Array<string>> = ref(user.value?.user_metadata?.roles ?? []);
  const isAdmin: Ref<boolean> = computed(() => roles.value.includes("admin"));
  function getUser() {
    const supbaseUser = useSupabaseUser();
    user.value = supbaseUser.value;
  }

  watch(user, () => {
    roles.value = user.value?.user_metadata?.roles ?? [];
  });

  function hasRole(role: string) {
    return roles.value.includes(role);
  }
  return { user, roles, isAdmin, getUser, hasRole };
});
