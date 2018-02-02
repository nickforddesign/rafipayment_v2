FROM node:latest

RUN apt-get -y update && apt-get -y upgrade

RUN apt-get -y install npm

# RUN mkdir -p /app
WORKDIR /app

ADD package.json ./

# add apple/google verification files
ADD verification/* /app/

RUN npm install

ADD ./ ./

EXPOSE 8080

CMD ["npm", "run", "start"]
