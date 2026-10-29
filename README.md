# DhanDiary Web

The web companion and download/promotion site for **DhanDiary**, the personal-finance app. The repository name is `DhanDairy-Web`; the product brand is written **DhanDiary**.

## What this project contains

- Public product and app information
- Download links and platform availability settings
- Responsive pages and shared UI components
- Search/social metadata and analytics integrations configured by the site
- A Vite-based frontend suitable for static hosting

The mobile app source is maintained separately in [EllowDigital/DhanDiary](https://github.com/EllowDigital/DhanDiary).

## Technology stack

- React, TypeScript, and Vite
- Tailwind CSS and reusable UI components
- ESLint, Prettier, and TypeScript checks
- Netlify configuration for hosting

## Local setup

Requirements: Node.js and npm.

```bash
git clone https://github.com/EllowDigital/DhanDairy-Web.git
cd DhanDairy-Web
npm ci
npm run dev
```

Use the local URL printed by Vite to review the site.

## Quality checks and build

```bash
npm run check
npm run build
npm run preview
```

`npm run check` runs the configured formatting, lint, and type checks. Check `package.json` before relying on a command in a new environment.

## Configuration

Review `.env.example` and `.env.local.template` for the configuration expected by the current version. Keep environment-specific settings in your local environment or hosting dashboard.

- Values prefixed with `VITE_` are included in browser-side output and are not secret.
- Only public URLs and public client configuration belong in the frontend environment.
- Do not add private API keys, database passwords, admin keys, or server credentials to a `VITE_*` variable.
- If a backend or administrative endpoint is configured, enforce authorization on the server; hiding a button in the UI is not access control.
- Do not use real financial records for screenshots or test fixtures.

## Deployment

The project includes Netlify configuration. Confirm the configured site, build command, output directory, canonical domain, download URLs, analytics consent/disclosure, and environment variables before deploying.

## Privacy and security

The site includes analytics configuration. Review the active tags and endpoints and make sure the privacy notice matches what is actually enabled. Report security concerns privately to the maintainer; do not publish credentials or real user data in issues.

## License

See [LICENSE](LICENSE). No open-source reuse of product branding, assets, or project-specific code is granted by this repository unless the relevant rights holder expressly authorizes it. Third-party dependencies remain subject to their own licenses.
