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

COPY . .
RUN bun i --production

# ? -------------------------

FROM base as builder
WORKDIR /app

COPY . .
RUN bun i

RUN cd web && bun --bun run vite build
RUN cd web && bun ./tools/patchSW.ts

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
COPY --from=builder /app/web/build ./build
COPY --from=builder /app/web/.svelte-kit ./.svelte-kit
# COPY public public

CMD ["./bun", "./build/index.js"]
