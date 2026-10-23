import type { User } from "../models/user";
import { spotifyUserGet } from "../utils/userTokenClient";

export const getCurrentUserProfile = (): Promise<User> => {
  return spotifyUserGet<User>("/me");
};
