# Xamo Triage Radiologique

Application bilingue de prétriage éducatif qui aide les patients à préparer une discussion avec leur médecin au sujet d’examens d’imagerie possibles.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/xamo-triage run dev` — run the patient web app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: Replit AI Integrations OpenAI variables are provisioned automatically

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/xamo-triage` — bilingual patient interface
- `artifacts/api-server/src/routes/triage.ts` — guarded educational analysis endpoint
- `lib/api-spec/openapi.yaml` — API contract

## Architecture decisions

- The app never presents imaging as a prescription; it frames modalities as discussion topics for a physician.
- High-risk symptom phrases bypass the AI response and immediately display emergency guidance.
- No patient triage information is persisted in the first version.

## Product

- Mandatory informed consent before intake
- French and English patient journey
- Symptoms, age, sex, duration, relevant history, medication, prior imaging, and pregnancy context
- Possible imaging discussion topics, physician questions, next steps, and emergency escalation

## User preferences

- Keep the visual identity aligned with Xamo.ca.
- Maintain French and English support.

## Gotchas

- Regenerate API clients after every OpenAPI change.
- Medical result wording must remain educational, non-diagnostic, and non-prescriptive.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
