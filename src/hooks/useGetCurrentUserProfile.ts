import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";
import type { User } from "../models/user";

const useGetCurrentUserProfile = (): UseQueryResult<User | null, Error> => {
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: async () => {
      if (!localStorage.getItem("access_token")) return null;
      return getCurrentUserProfile();
    },
    retry: false,
  });
};

export default useGetCurrentUserProfile;
