# Workspace Instructions

This file is the entry point for every coding session in this repository.

## Read First

Before changing the project, read these files in order:

1. `README.md` for setup, architecture, content locations, and deployment.
2. `docs/PROJECT_CONTEXT.md` for product intent, constraints, and conventions.
3. `docs/DECISIONS.md` for decisions that should not be revisited accidentally.
4. `docs/SESSION_HANDOFF.md` for the latest state and unfinished work.

Inspect `git status` before editing. Preserve user changes and do not edit generated
files in `dist/` directly.

## Working Agreement

- Keep the site static, accessible, responsive, and dependency-light.
- Put visible page content and section data in `src/App.jsx`.
- Put global layout and visual rules in `src/styles.css`.
- Keep canonical-domain and crawler information aligned across `index.html` and
  `public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt`.
- Treat `dist/` as generated output. Recreate it with `npm run build` or
  `make prepare`.
- Never commit credentials, AWS account details, bucket names, distribution IDs,
  or local `.env` files.
- Run `npm run build` after code or content changes. Run `make prepare` when a
  change affects release output or crawler files.
- Do not deploy unless the user explicitly requests it and supplies the intended
  AWS target through the documented command arguments.

## Keeping Session Continuity

At the end of any session that changes the repository:

1. Update `docs/SESSION_HANDOFF.md` with the current state, validation performed,
   and concrete next steps. Replace stale status; do not accumulate a diary.
2. Add an entry to `docs/DECISIONS.md` only for a durable architectural, product,
   content, or operational decision. Do not record routine edits there.
3. Update `docs/PROJECT_CONTEXT.md` when the product direction, constraints,
   ownership of content, or architecture changes.
4. Update `README.md` when setup, commands, project structure, or public-facing
   operational documentation changes.

If no work remains, say so explicitly in the handoff instead of inventing a task.

