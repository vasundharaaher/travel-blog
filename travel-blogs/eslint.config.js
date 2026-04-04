import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"],
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.node } 
  },
  {
    rules: {
      "no-unused-vars": 'warn',
      "no-var": 'warn',
      "prefer-const": 'warn',
      "prefer-template": 'warn',
      "no-param-resign": 'warn',
      eqeqeq: 'warn',
    }
  }
]);
