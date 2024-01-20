export const useFetchApi: typeof useFetch = (url: string, options?: any) => {
  const config = useRuntimeConfig();
  options = {
    ...options,
    baseURL: config.public.apiUrl,
    headers: useRequestHeaders(["cookie"]),
  };

  return useFetch(url, {
    // your defaults
    key: url,
    ...options,
  });
};
