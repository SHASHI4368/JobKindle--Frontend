import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Change from 'error' to 'warn' or 'off' depending on your need
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "off"
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      ""
    },
  },
];

export default eslintConfig;
