# Yarn

### Enable workspaces

Documentation:
- [Workspaces in Yarn](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)

```sh
yarn config set workspaces-experimental true
```

In `package.json` define the workspaces folder:

```json
{
  "name": "example",
  "private": true,
  "workspaces": ["packages/*"]
}

```
