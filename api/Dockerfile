FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

CMD [ "npm", "run", "start" ]