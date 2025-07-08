# Stage 1: Build
FROM oven/bun:1.1.13 as builder

WORKDIR /app

# Install deps first for caching
COPY bun.lockb package.json ./
RUN bun install

# Copy the rest of the code
COPY . .

# Optional: run build if your app has a build step
# RUN bun run build

# Stage 2: Production
FROM oven/bun:1.1.13-slim

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000
CMD ["bun", "start"]


# Stage 1: Build
# FROM oven/bun:1.1.6
# WORKDIR /app

# # Copy only what's needed
# COPY bun.lockb package.json ./
# RUN bun install

# # Copy the rest of the app
# COPY . .

# ENV NODE_ENV=production
# EXPOSE 8000

# # Replace "start" with your actual entry point if needed
# CMD ["bun", "start"]
