import axios from "axios";
import type { ClientCredentialTokenResponse } from "../models/auth";

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    const response = await axios.get("/api/token");
    return response.data;
  };
