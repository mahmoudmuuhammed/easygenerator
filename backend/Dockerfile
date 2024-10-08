# Stage 1: Build the application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy built application from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Copy the .env file template if it exists
COPY .env .env

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["node", "dist/main"]