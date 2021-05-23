FROM node:10.16.2

WORKDIR /app

ENV NODE_ENV development
COPY package.json yarn.lock ./
RUN yarn

COPY . .

EXPOSE 8080

CMD [ "yarn", "start:dev" ]