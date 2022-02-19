FROM node:16-alpine3.14

RUN apk update && \
        apk add git