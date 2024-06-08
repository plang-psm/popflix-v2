import babelParser from "@babel/eslint-parser";
import react from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        process: "readonly", // Define the process global
      },
    },
    plugins: {
      react,
    },
    rules: {
      "react/prop-types": "off", // Example rule
      // Add other custom rules here
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the react version
      },
    },
  },
];