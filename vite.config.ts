import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { GET as getToken } from "./api/token.ts";

const localApi = (): Plugin => ({
  name: "local-api",
  configureServer(server) {
    server.middlewares.use("/api/token", async (_req, res) => {
      try {
        const response = await getToken();
        res.statusCode = response.status;
        res.setHeader("Content-Type", "application/json");
        res.end(await response.text());
      } catch (error) {
        console.error("[local-api] /api/token 실패:", error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "token request failed" }));
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react(), localApi()],
  };
});
