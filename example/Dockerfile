FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json riffyh.config.ts tsconfig.json .
COPY store ./store

RUN bun i && \
    mkdir -p .cache && \
    chown -R bun:bun .cache

USER bun
EXPOSE 3000

ENTRYPOINT [ "bun", "run", "server" ]
