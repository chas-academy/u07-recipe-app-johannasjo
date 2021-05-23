FROM node:alpine AS builder
WORKDIR /app
COPY package*.json /app/
RUN npm install && npm cache clean --force
COPY ./ /app/
RUN npm run build --prod 

# https://hub.docker.com/_/nginx
FROM nginx
COPY --from=builder /app/dist/recipe-practice-task /usr/share/nginx/html