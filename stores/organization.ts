import type { User } from "@supabase/supabase-js";

export const useOrganizationStore = defineStore("organization", () => {
  const { $client } = useNuxtApp();
  const organizationId: Ref<string> = ref("");
  async function getOrgId() {
    const { data, error } = await $client.userProfile.getSelf.useQuery();
    if (data && data.value) {
      organizationId.value = data.value.organizationId;
    }
  }
  return { getOrgId, organizationId };
});
