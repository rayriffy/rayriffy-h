FROM debian:11.6-slim as base
WORKDIR /app

ENV PATH="${PATH}:/root/.bun/bin"

RUN apt update
RUN apt install curl wget unzip -y

RUN curl https://bun.sh/install | bash
RUN bun -v

# ? -------------------------

FROM base as deps-prod
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun i --production
RUN cd node_modules/sharp && \
    bun run ./install/dll-copy.js && \
    bun run prebuild-install && \
    cd ../..

# ? -------------------------

FROM base as builder
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun i
RUN cd node_modules/sharp && \
    bun run ./install/dll-copy.js && \
    bun run prebuild-install && \
    cd ../..

COPY postcss.config.cjs svelte.config.js tailwind.config.cjs tsconfig.json vite.config.ts ./
COPY static ./static
COPY tools ./tools
COPY src ./src

RUN bun --bun run vite build
RUN bun ./tools/patchSW.ts

# ? -------------------------

FROM gcr.io/distroless/base
WORKDIR /app

ENV NODE_ENV production

COPY package.json ./
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY --from=builder /app/build ./build
COPY data ./data
# COPY public public

CMD ["./bun", "./build/index.js"]

EXPOSE 3000