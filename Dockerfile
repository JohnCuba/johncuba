FROM oven/bun:1 as build-stage
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app

FROM build-stage AS install-stage
RUN bun install
COPY . /app
RUN bun run build

FROM oven/bun:1 as production-stage
COPY --from=install-stage /app /app
WORKDIR /app
EXPOSE 3000
CMD ["bun", "run", "preview"]