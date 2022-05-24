FROM node:16.13.0

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_module/.bin:$PATH

COPY . /usr/src/app/

COPY package.json /usr/src/app/package.json

RUN npm install

RUN npm install react-scripts -g

CMD ["npm","start"]
