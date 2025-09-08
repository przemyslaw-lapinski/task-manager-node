FROM node:24-alpine

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p /usr/src/app/dist \
    && chown -R node:node /usr/src/app

USER node

EXPOSE 3000

CMD ["npm", "run", "start:dev"]