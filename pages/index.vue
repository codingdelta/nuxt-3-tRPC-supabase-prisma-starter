<template>
  <!-- {{ userProfile }} -->
  <div class="rounded-xl bg-white p-5">
    <h1 class="text-3xl font-bold">Users</h1>
    <UTable :rows="[userProfile]" />
  </div>
</template>

<script setup lang="ts">
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/trpc/routers";

const user = useSupabaseUser();

type RouterOutput = inferRouterOutputs<AppRouter>;
type UserProfile = RouterOutput["user"]["getSelf"];
const userProfile: Ref<UserProfile> = ref();
await getUserProfile();
async function getUserProfile() {
  const { data, error } = await client().user.getSelf.useQuery();
  if (error.value) {
    console.error(error.value);
    return;
  }
  userProfile.value = data.value;
}
</script>
