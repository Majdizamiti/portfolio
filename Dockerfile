# Stage 1: build Angular app
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2: nginx server
FROM nginx:alpine

COPY --from=build /app/dist/majdi /usr/share/nginx/html

EXPOSE 80
