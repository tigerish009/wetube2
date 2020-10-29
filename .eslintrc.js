module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "indent": ["error", 4]
    },
    "extends": ["eslint:recommended", "plugin:prettier/recommended"],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "no-console" : "off"
    }
};
