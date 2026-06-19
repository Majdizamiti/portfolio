# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# IMPORTANT: replace <your-angular-app-name>
COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80
