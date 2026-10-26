FROM node:22-bookworm-slim

# Install Chrome dependencies AND git
RUN apt-get update && apt-get install -y \
  libnss3 \
  libdbus-1-3 \
  libatk1.0-0 \
  libgbm-dev \
  libasound2 \
  libxrandr2 \
  libxkbcommon-dev \
  libxfixes3 \
  libxcomposite1 \
  libxdamage1 \
  libatk-bridge2.0-0 \
  libpango-1.0-0 \
  libcairo2 \
  libcups2 \
  git \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy project files
COPY package.json package*.json yarn.lock* pnpm-lock.yaml* bun.lockb* bun.lock* tsconfig.json* remotion.config.* ./
COPY src ./src
COPY public ./public

# Install dependencies
RUN npm i

# Ensure Chrome is available for Remotion
RUN npx remotion browser ensure

EXPOSE 3000

CMD ["npm", "run", "start"]
