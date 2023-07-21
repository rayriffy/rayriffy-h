FROM node:18-slim as deps-prod

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npx pnpm -r i --frozen-lockfile --prod

# ? -------------------------

FROM node:18-slim as builder

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npx pnpm -r i --frozen-lockfile

COPY postcss.config.cjs svelte.config.js tailwind.config.cjs tsconfig.json vite.config.ts ./
COPY static ./static
COPY tools ./tools
COPY src ./src

RUN npx pnpm build

# ? -------------------------

FROM gcr.io/distroless/nodejs18-debian11 as runner

ENV NODE_ENV production

COPY package.json ./
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY --from=builder /app/build ./build
COPY data ./data

EXPOSE 3000
ENV PORT 3000

CMD ["./build/index.js"]
