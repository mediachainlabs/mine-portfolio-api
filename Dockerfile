FROM node:5.1.0

ENV NODE_PATH=/data/node_modules/
ENV PATH=/data/node_modules/.bin:$PATH

RUN mkdir -p /data
COPY package.json /data

RUN cd /data \
  && npm install \
  && mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY . /usr/src/app

CMD [ "npm", "run", "dev"]
