import { useQuery } from "@tanstack/react-query";

export const useStakeWizData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stakeWizData"],
    queryFn: () => fetchStakeWizData(),
  });

  return { data, isLoading, error };
};

const fetchStakeWizData = async () => {
  const response = await fetch(
    "https://api.stakewiz.com/validator/sT34kbaqmHWbPwjhyeG1GnjoX82KpXawFsnzUkzJpYX"
  );
  return response.json();
};
