# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:18-bullseye-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# This includes both 'package.json' AND 'yarn.lock'.
COPY package.json yarn.lock ./

# Install production dependencies.
RUN yarn install --frozen-lockfile

# Copy local code to the container image.
COPY . ./

# Copy tasks.txt file
COPY tasks.txt ./

# Start the application
CMD ["yarn", "start"]
