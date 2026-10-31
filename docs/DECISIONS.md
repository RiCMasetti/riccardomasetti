# Decision Log

Record only decisions that future sessions need in order to avoid undoing intent.
Add new entries at the top using the same format: date, status, decision, and
reason. If a decision is superseded, keep it and link to the newer entry.

## 2026-10-31 — License the Repository Under MIT

**Status:** Accepted

**Decision:** License the repository under the MIT License, with copyright held
by Riccardo Masetti.

**Reason:** The project owner selected a permissive open-source license that
allows reuse, modification, and distribution while retaining the copyright
notice and warranty disclaimer.

## 2026-10-31 — Use Repository Markdown for Session Continuity

**Status:** Accepted

**Decision:** Use `AGENTS.md` as the session entry point, `PROJECT_CONTEXT.md` for
durable context, `DECISIONS.md` for lasting choices, and `SESSION_HANDOFF.md` for
the replaceable current-state handoff.

**Reason:** The repository previously had good setup documentation but no
structured way for a new session to recover intent, constraints, and unfinished
work without rediscovering them from source and Git history.

## Existing Baseline — Static One-Page React Site

**Status:** Accepted

**Decision:** Keep the portfolio as a dependency-light React/Vite one-page site
that builds to static files for S3 and CloudFront.

**Reason:** The content and interactions do not require a backend or a larger
application framework. Static delivery keeps the site fast, inexpensive, and
operationally simple.

## Existing Baseline — Privacy Without Tracking

**Status:** Accepted

**Decision:** Do not use analytics, advertising trackers, cookies, forms, or a
backend. The privacy-notice dismissal may use local storage in the visitor's
browser.

**Reason:** This matches the site's documented privacy posture and minimizes data
collection and operational complexity.

## Existing Baseline — Generated Distribution Directory

**Status:** Accepted

**Decision:** Treat `dist/` as generated build output and exclude it from version
control. Author crawler files in `public/` and produce deployable output through
the build.

**Reason:** This prevents source/output drift and makes local and deployment
builds reproducible.

