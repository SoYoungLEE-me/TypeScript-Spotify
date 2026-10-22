import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/config";
import type { ClientCredentialTokenResponse } from "../models/auth";

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    const body = new URLSearchParams({ grant_type: "client_credentials" });

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      body,
      {
        headers: {
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  };
