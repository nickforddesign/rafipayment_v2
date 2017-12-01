FROM node:latest

RUN apt-get update

RUN apt-get -y install npm

RUN mkdir -p /app
WORKDIR /app

ADD package.json /app/

RUN npm install

ADD . /app

EXPOSE 8080

CMD ["npm", "run", "start"]
