import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    plugins: [react()],
    define: {
      "process.env.API_KEY": JSON.stringify(env.API_KEY),

      "process.env.AUTH_DOMAIN": JSON.stringify(env.AUTH_DOMAIN),

      "process.env.PROJECT_ID": JSON.stringify(env.PROJECT_ID),

      "process.env.STORAGE_BUCKET": JSON.stringify(env.STORAGE_BUCKET),

      "process.env.MESSAGING_SENDER_ID": JSON.stringify(
        env.MESSAGING_SENDER_ID
      ),

      "process.env.APP_ID": JSON.stringify(env.APP_ID),

      "process.env.MEASUREMENT_ID": JSON.stringify(env.MEASUREMENT_ID),

      "process.env.STRIPE_PUBLISHABLE_KEY": JSON.stringify(
        env.STRIPE_PUBLISHABLE_KEY
      ),

      "process.env.STRIPE_PRICE_ID": JSON.stringify(env.STRIPE_PRICE_ID),

      "process.env.GUEST_EMAIL": JSON.stringify(env.GUEST_EMAIL),

      "process.env.GUEST_PASSWORD": JSON.stringify(env.GUEST_PASSWORD),
      "process.env.CLIENT_URL": JSON.stringify(env.CLIENT_URL),
    },
  };
});
