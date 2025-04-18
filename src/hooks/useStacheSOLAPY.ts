import { useQuery } from "@tanstack/react-query";

export const useStacheSOLAPY = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stacheSOLAPY"],
    queryFn: () => {
      return fetch(
        "https://extra-api.sanctum.so/v1/apy/latest?lst=stacheSOL"
      ).then(async (res) => {
        const data = (await res.json()) as { apys: { stacheSOL: number } };
        return data["apys"]["stacheSOL"] * 100;
      });
    },
  });

  return { data, isLoading, error };
};
