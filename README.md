# Project Hermes

Official website for the E-Cell of NIT Rourkela, built by [OpenCode](https://opencodenitr.in/), the institute’s official open-source and cybersecurity club. The platform represents E-Cell’s initiatives in startups, innovation, and entrepreneurship.

## Setup

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

## Build

```bash
pnpm build
pnpm start
```

## Linting and Formatting

Run ESLint manually:

```bash
pnpm lint
```

Format files with Prettier:

```bash
pnpm exec prettier --write .
```

ESLint and Prettier also run automatically on staged files during commits via Husky and lint-staged.

## Contributing

```bash
git checkout -b your-branch-name
git add .
pnpm commit
git push
```
