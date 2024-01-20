<template>
  <section>
    <div class="flex h-screen w-full">
      <div class="w-full md:w-1/2">
        <div class="mt-40 flex min-h-full flex-1 flex-col px-6 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
              class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
            >
              Create an account
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <UForm
              ref="form"
              :schema="schema"
              :state="state"
              class="space-y-4"
              @submit="createPlan"
              @error="onError"
            >
              <div class="flex flex-col gap-3">
                <UFormGroup
                  label="Select legal entity"
                  name="legalEntityId"
                  class="w-full"
                >
                  <USelect
                    v-model="state.legalEntityId"
                    :options="legalEntities"
                    option-attribute="name"
                    value-attribute="id"
                  />
                </UFormGroup>

                <UFormGroup
                  label="Select the share class"
                  name="shareClassId"
                  class="w-full"
                >
                  <USelect
                    v-model="state.shareClassId"
                    :disabled="state.legalEntityId ? false : true"
                    :options="shareClasses"
                    option-attribute="name"
                    value-attribute="id"
                  />
                </UFormGroup>
              </div>
              <div><UButton type="submit" class="mt-4"> Submit </UButton></div>
            </UForm>
          </div>
        </div>
      </div>
      <div
        class="hidden w-1/2 items-center justify-center bg-slate-100 sm:flex"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "login",
});

const state = ref({
  name: undefined,
  email: undefined,
  password: undefined,
});

const supabase = useSupabaseClient();

const logIn = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (data.user) {
    return navigateTo("/");
  }
  if (error) {
    useToast().add({
      title: "Error",
      description: error.message,
      color: "red",
    });
  }
};
</script>
