FROM debian:slim as deps

WORKDIR /app

RUN apt update
RUN apt install curl unzip -y

RUN curl https://bun.sh/install | bash

COPY package.json .
COPY bun.lockb .

RUN /root/.bun/bin/bun install

# ? -------------------------

FROM debian:slim as deps-prod

WORKDIR /app

COPY --from=deps /root/.bun/bin/bun bun

COPY package.json .
COPY bun.lockb .

RUN /app/bun install --production

# ? -------------------------

FROM debian:slim as builder

WORKDIR /app
COPY src ./src
COPY static ./static
COPY package.json bun.lockb* pnpm-lock.yaml* postcss.config.cjs svelte.config.js tailwind.config.cjs tsconfig.json vite.config.js ./
COPY --from=deps /root/.bun/bin/bun bun
COPY --from=deps /app/node_modules ./node_modules

RUN /app/bun run build

# ? -------------------------

FROM gcr.io/distroless/base as runner

WORKDIR /app

COPY data ./data
COPY package.json ./
COPY --from=deps /root/.bun/bin/bun bun
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY --from=builder /app/build ./build

EXPOSE 3000
ENV PORT 3000
ENV ENV production

CMD ["./bun", "build/index.js"]
