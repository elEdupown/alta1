FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json next-env.d.ts .env ./

RUN npm install

COPY ./src/ ./src/

RUN npm run build && npm run export



# nginx
FROM nginx:1.21-alpine

COPY --from=builder /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
