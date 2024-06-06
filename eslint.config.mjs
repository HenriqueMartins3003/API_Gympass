import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

module.exports = {
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ]
  }
}

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  
];

