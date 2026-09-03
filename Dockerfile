FROM node:22-bookworm-slim AS build

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json tsconfig.base.json ./
COPY artifacts/xamo-triage/package.json artifacts/xamo-triage/package.json
COPY artifacts/api-server/package.json artifacts/api-server/package.json
COPY lib/api-client-react/package.json lib/api-client-react/package.json
COPY lib/api-spec/package.json lib/api-spec/package.json
COPY lib/api-zod/package.json lib/api-zod/package.json
COPY lib/db/package.json lib/db/package.json
COPY lib/integrations-openai-ai-server/package.json lib/integrations-openai-ai-server/package.json
COPY scripts/package.json scripts/package.json
RUN pnpm install --frozen-lockfile

COPY . .
RUN PORT=7860 BASE_PATH=/ pnpm --filter @workspace/xamo-triage run build
RUN pnpm --filter @workspace/api-server run build

FROM node:22-bookworm-slim
WORKDIR /app
RUN corepack enable
COPY --from=build /app /app

ENV NODE_ENV=production
ENV PORT=7860
ENV SERVE_FRONTEND=true
EXPOSE 7860

CMD ["pnpm", "--filter", "@workspace/api-server", "run", "start"]