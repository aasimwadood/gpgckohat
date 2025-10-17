import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vite plugin that rewrites any import like "pkg" or "@scope/pkg"
 * into "pkg" / "@scope/pkg" respectively.
 * This lets you KEEP version-stamped specifiers in your codebase while resolving
 * them to installed packages at build/dev time.
 */
function stripVersionSpecifier(): Plugin {
  return {
    name: "strip-version-specifier",
    enforce: "pre",
    resolveId(source, importer, options) {
      // Ignore absolute/relative paths and URLs
      if (source.startsWith(".") || source.startsWith("/") || source.includes("://")) return null;

      // Match the LAST "@<version>" where version starts with a digit
      // Handles scoped packages like "@radix-ui/react-accordion"
      const m = source.match(/^(.*)@([0-9][\w\.-]*)$/);
      if (m) {
        const cleaned = m[1];
        return this.resolve(cleaned, importer, { skipSelf: true, ...options });
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [stripVersionSpecifier(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
