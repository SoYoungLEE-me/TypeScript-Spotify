import { generateRandomString, base64encode, sha256 } from "./crypto";
import { CLIENT_ID, REDIRECT_URI, SCOPES } from "../configs/config";
import type { AuthUrlParams } from "../models/auth";

export const getSpotifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);

  if (CLIENT_ID && REDIRECT_URI) {
    const params: AuthUrlParams = {
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPES,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI,
    };

    authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    window.location.href = authUrl.toString(); //spotify 로그인 주소를 연다
  }
};
