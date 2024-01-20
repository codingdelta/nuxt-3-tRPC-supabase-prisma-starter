<template>
  <section>
    <div class="flex h-screen w-full">
      <div class="w-full md:w-1/2">
        <div class="mt-40 flex min-h-full flex-1 flex-col px-6 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
              class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
            >
              Sign in to your account
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Email address</label
                >
                <div class="mt-2">
                  <input
                    v-model="email"
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Password</label
                  >
                </div>
                <div class="mt-2">
                  <input
                    v-model="password"
                    @keydown.enter="logIn"
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  @click="logIn"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </div>
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
const email = ref("");
const password = ref("");

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
