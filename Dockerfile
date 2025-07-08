# Stage 1: Builder
FROM oven/bun:1.1.13 as builder

WORKDIR /app

# Copy dependencies
COPY bun.lockb package.json ./

# Install dependencies
RUN bun install

# Copy app source
COPY . .

# Optional: Build step (uncomment if needed)
# RUN bun run build

# Stage 2: Production
FROM oven/bun:1.1.13

WORKDIR /app

# Copy app from builder
COPY --from=builder /app /app

# Expose the app port
EXPOSE 3000

# Start the app
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
