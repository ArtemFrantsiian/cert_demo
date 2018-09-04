FROM node:8.9-alpine

RUN apk add --update --no-cache \
    python \
    python-dev \
    py-pip \
    bash \
    build-base \
    && pip install --upgrade pip \
    && hash -r pip \
    && pip install virtualenv

WORKDIR /app

COPY ./cert-generate-server/package.json ./package.json
RUN npm install

COPY ./cert-generate-server/src ./src
RUN npm run build

COPY ./cert-generate-server/.env ./.env

CMD ["node", "dist/index.js"]