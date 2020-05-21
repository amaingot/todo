FROM node:13-alpine

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app

COPY ./server .
COPY ./web/build ./assets

ARG SHA
ENV SHA=${SHA}

RUN yarn

EXPOSE 8080

CMD ["yarn", "start:in-container"]
