# Task Checklist

- [x] creates `src` main folder if it not exists
- [x] creates `repository` layer
- [x] creates `service` layer with `repository` as dependency
- [x] creates `factory` layer with `service` and `repository` returning its instances
- [x] can create multiples domains with a single command
- [x] saves files as `camelCase` and classes as `PascalCase`
- [x] reaches **100% test coverage**
- [x] integration tests should validate files on disk as a valid JS class

## Make a command line tool

Steps

- Add bin to the package.json file:

```
"bin": {
    "codegen": "./src/index.js"
}
```

- Add the shebang line for Node in the index.js file:
  `#!/usr/bin/env node`

- Run the npm command in the codegen directory:
  `npm link`

- To see the documentation run:
  `codegen --help`
