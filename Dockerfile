FROM node:lts-alpine as build-stage
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . /app
RUN npm run build

FROM node:lts-alpine as production-stage
COPY --from=build-stage /app /app
WORKDIR /app
EXPOSE 3000
CMD ["npm", "run", "preview"]