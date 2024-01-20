<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications :ui="{ position: 'top-0 bottom-auto' }" />
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: "h-full bg-slate-50",
  },
});
</script>
