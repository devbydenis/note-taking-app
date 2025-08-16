import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";
import tailwind from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // prettier (disable conflicting rules)
  prettier,
  // tailwindcss lint
  {
    plugins: { tailwind },
    rules: {
      ...tailwind.configs.recommended.rules,
    },
  },
  // prettier as eslint plugin (biar auto linting format)
  {
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error",
    },
  },
];

export default eslintConfig;
