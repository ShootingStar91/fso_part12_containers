FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV REACT_APP_BACKEND_URL="http://localhost:3000/api"

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf
