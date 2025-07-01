# Use an official Bun image
FROM oven/bun:latest as builder

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb first to leverage Docker's build cache
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile --production

# Copy the rest of your application code
COPY . .

# Expose the port your app listens on (e.g., 3000 or 8080)
EXPOSE 3000

# Command to run your application
# This assumes your package.json has "start": "bun run index.ts"
CMD ["bun", "run", "start"]