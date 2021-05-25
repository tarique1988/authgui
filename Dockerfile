FROM node:16.1-alpine

WORKDIR /usr/apps

ADD . .

RUN npm i

RUN npm run build

EXPOSE 3001

CMD npm start
