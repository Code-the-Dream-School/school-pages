# 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run fmt`             | Format all files with Prettier                   |
| `npm run check:fmt`       | Ensure all files were formatted with Prettier    |
| `npm run check:types`     | Perform typescript type-checking                 |
| `npm run lint`            | Perform linting via eslint                       |
| `npm run check`           | Perform all checks, just like what happens in CI |

## CI Checks

> ⚠️⚠️ Fighting with CI? run `npm run check` to run CI locally! ⚠️⚠️

CI checks will occur for every merge request, and they must pass as a
prerequisite for merging the MR!

- type-checking via typescript
- linting via eslint
- format-checking via prettier

You should be using a text editor like VS Code, which has a Language Support
Server for typescript, which will cause type-errors to immediately appear in
your editor. You should also install an eslint plugin for your editor, which
will cause linting errors to appear immediately in your editor. You should also
configure your editor to format files with prettier when you save.

You may also use the formatting script if you would not like to use prettier in
your editor; simply run `npm run fmt` to format everything!

### Common Issues & Troubleshooting

> Linting errors from `npm run check:astro` do not appear in my editor

Astro has a special Language Support Protocol (LSP) server for its templating
language. For VS Code, you can install the Astro plugin, which is recommend in
this repository's `.vscode/extensions.json` file. For neovim users, you can
install the Astro LSP with `nvim-lspconfig` following the directions here:
https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#astro
