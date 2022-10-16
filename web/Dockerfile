FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json next-env.d.ts ./

RUN npm install

COPY ./web/src ./src

RUN npm run build



# nginx
FROM nginx:1.21-alpine

COPY --from=builder /app/.next /usr/share/nginx/html
