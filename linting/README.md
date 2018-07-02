# Linting

## Basic eslint configuration for React

This will configure prettier to be part of eslint rules, which means running `eslint --fix` will actually apply prettier.

Install eslint dependencies:

```bash
yarn add -D eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-react eslint-config-cypress babel-eslint

npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-react eslint-config-cypress babel-eslint
```

And create the file `.eslintrc` containing the following configuration.
Feel free to remove the extra config if not needed.

```json
{
    "env": {
        "es6": true,
        "browser": true,
        "mocha": true,
        "jest": true,
        "node": true,
        "cypress/globals": true
    },
    "plugins": ["prettier", "react", "cypress"],
    "extends": [
        "eslint:recommended",
        "prettier",
        "prettier/react",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true
        }
    },
    "rules": {
        "prettier/prettier": [
            "error",
            {
                "singleQuote": true,
                "tabWidth": 4,
                "trailingComma": "all"
            }
        ],
        "react/forbid-prop-types": ["warn"],
        "react/prop-types": ["warn"],
        "react/jsx-no-bind": ["warn"],
        "react/jsx-indent": ["warn"],
        "react/jsx-indent-props": ["warn"],
        "react/jsx-filename-extension": ["off"],
        "import/no-named-as-default": ["warn"],
        "no-unused-vars": [
            "error",
            {
                "ignoreRestSiblings": true
            }
        ]
    },
    "overrides": [
        {
            "files": ["**/*.spec.js"],
            "rules": {
                "react/jsx-no-bind": ["off"],
                "react/prop-types": ["off"]
            }
        }
    ]
}
```

## Bonus - apply eslint on every commits

Install dependencies:

```bash
yarn add -D husky lint-staged

npm install --save-dev husky lint-staged
```

Add this to the package.json:

```diff
{
  "scripts": {
+   "precommit": "lint-staged"
  },
+ "lint-staged": {
+   "*.js": ["eslint --fix", "git add"]
+ }
}
```

If you dislike putting configuration inside the `package.json`, just ommit the `lint-staged` key and create a `.lintstagedrc` files with:

```json
{
    "*.js": ["eslint --fix", "git add"]
}
```

> If you wish to use `lint-staged` in a multi package monorepo, it is recommended to install `husky` in the root `package.json`. `lerna` can be used to execute the `precommit` script in all sub-packages.
