# Copilot Instructions for AI Agents

## Project Overview
- This is a Next.js monorepo using the `/src/app` directory for all application routes and logic.
- The project is structured by user roles: `admin`, `merchant`, and `user`, each with their own subfolders under `src/app` for dashboards, analytics, campaigns, etc.
- API routes are colocated under `src/app/api`, mirroring the frontend structure for clear separation of admin, merchant, and user endpoints.
- Shared UI components are in `src/components/ui/`, with role-specific sidebars in `src/components/`.
- Context and utility logic are in `src/context/` and `src/lib/` respectively.

## Key Patterns & Conventions
- **Routing:** Uses Next.js App Router. Each `page.js` under a route folder is a route entry point. Example: `src/app/merchant/dashboard/page.js`.
- **API:** All backend logic is in `src/app/api/**/route.js`. Each subfolder represents a REST endpoint. Example: `src/app/api/admin/users/route.js`.
- **Styling:** Global styles in `src/app/globals.css`. Component-level styles are colocated or use Tailwind CSS (see `postcss.config.mjs`).
- **Component Structure:** Prefer colocating related components in subfolders. Use `src/components/ui/` for reusable UI primitives.
- **Constants & Mocks:** Use `src/lib/constants.js` and `src/lib/mockData.js` for shared values and mock data.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (see README.md)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (uses `eslint.config.mjs`)
- **No explicit test scripts found**; add tests in the future as needed.
- **Debugging:** Use browser devtools and Next.js error overlays. No custom debug scripts.

## Integration & Dependencies
- Uses Next.js, Tailwind CSS, and PostCSS. See `package.json` for all dependencies.
- Google authentication is implemented under `src/app/api/auth/google/route.js` and related frontend pages.
- Lottie, Three.js, and Spline integrations are in `src/components/lottie/`, `src/components/three/`, and `src/components/spline/`.

## Examples
- To add a new merchant dashboard feature:
  - Frontend: `src/app/merchant/dashboard/page.js`
  - API: `src/app/api/merchant/dashboard/route.js`
- To add a new UI component: `src/components/ui/YourComponent.js`

## References
- See `README.md` for getting started and deployment.
- See `src/app/layout.js` for global providers and layout logic.
- See `src/context/AuthContext.js` for authentication context.

---
For more, follow Next.js and project-specific patterns as seen in the codebase. When in doubt, mirror the structure of existing features.