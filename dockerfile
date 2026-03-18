FROM oven/bun:latest AS installer 

WORKDIR /app

COPY package*.json bun.lock  ./
RUN bun install 

COPY . .

RUN bun build ./program/index.ts --outdir dist --target bun

FROM oven/bun:slim AS deployer

WORKDIR /app
 
COPY --from=installer  /app/dist /app/dist 

EXPOSE 3000

CMD ["bun", "run", "dist/index.js"]