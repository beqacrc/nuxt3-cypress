import { defineConfig } from "cypress";
import viteConfig from "./vite.config.cypress.component.js";

export default defineConfig({
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
      viteConfig,
    },
  },
});
