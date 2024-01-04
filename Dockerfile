FROM debian:11.6-slim as base
WORKDIR /app

ENV PATH="${PATH}:/root/.bun/bin"

RUN apt update
RUN apt install curl unzip patch -y

RUN curl https://bun.sh/install | bash -s -- bun-v1.0.21

RUN bun -v

# ? -------------------------

FROM base as deps-prod
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun i --production --ignore-scripts

# ? -------------------------

FROM base as builder
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun i --ignore-scripts

COPY postcss.config.cjs svelte.config.js tailwind.config.cjs tsconfig.json vite.config.ts ./
COPY static ./static
COPY tools ./tools
COPY src ./src

RUN bun --bun run vite build
RUN bun ./tools/patchSW.ts

# ? -------------------------

FROM gcr.io/distroless/cc
WORKDIR /app

ENV HOST 0.0.0.0
ENV PORT 8080
ENV NODE_ENV production

# https://github.com/gornostay25/svelte-adapter-bun/issues/39
ENV PROTOCOL_HEADER x-forwarded-proto
ENV HOST_HEADER x-forwarded-host

EXPOSE 8080

COPY package.json ./
COPY --from=base /root/.bun/bin/bun bun
# COPY --from=base /opt /
COPY --from=deps-prod /app/node_modules ./build/node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY data ./data
# COPY public public

CMD ["./bun", "./build/index.js"]
