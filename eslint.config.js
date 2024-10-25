import globals from "globals";
import js from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    ignores: ["**/*.json", "**/*.config.js"],
    // root: true,
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        console: "readonly",
      },
    },
    rules: {
      // regras customizadas
      "no-console": "off",
      eqeqeq: "error",
      curly: "error",
      "no-var": "error",
      "no-unused-vars": "error",
      "prefer-const": ["warn", { "ignoreReadBeforeAssign": true }],
      "quotes": ["warn", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
      "indent": ["error", 2]
    },
  },
  js.configs.recommended,
];
