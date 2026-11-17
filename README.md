# Personal

[![Test status](https://github.com/jamesacarr/personal/workflows/tests/badge.svg)](https://github.com/jamesacarr/personal/actions?query=workflow%3Atests)
[![Checkly Status](https://api.checklyhq.com/v1/badges/checks/e92210ba-0ad7-487e-8c63-ca91fa13689f?style=flat&theme=default)](https://app.checklyhq.com/checks/e92210ba-0ad7-487e-8c63-ca91fa13689f/)

My personal website.

The website is built in Typescript using [Next.js](https://nextjs.org/) and deployed with [Vercel](https://vercel.com/).

## Development

In order to develop with this code, clone the repository and run:

```sh
pnpm install
pnpm dev
```

The website has hot module reloading, so changes made will show up instantly.

Lint, typecheck and tests run as cached [Turborepo](https://turborepo.dev/) tasks. The commands are:

- `pnpm check` runs lint, typecheck and tests. Unchanged tasks are restored from the local cache.
- `pnpm turbo run <task>` runs a single cached task (`lint:ci`, `typecheck` or `test`).
- `pnpm lint` runs Biome with `--write`. It isn't cached because it modifies files.
- `pnpm test:watch` runs Vitest in watch mode. It isn't cached.
- `pnpm test:coverage` runs the tests with coverage. It isn't cached.

The test cache key includes the `TZ` environment variable.

## Deployment

All code pushed to `main` will be automatically deployed. Branches will be deployed to their own environments.

## License

© James Carr 2026
