FROM node:16-alpine3.11 as build

WORKDIR /app
COPY ./server/package.json ./server/yarn.lock ./
COPY ./server .
COPY ./shared ../shared

RUN yarn install
RUN yarn build

FROM node:16-alpine3.11 as final

WORKDIR /app
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/dist ./dist

RUN yarn install --only=production

WORKDIR /app

COPY --from=build /app/.sequelizercDocker ./.sequelizerc
COPY --from=build /app/sequelizeConfig.json ./
COPY --from=build /app/sequelizeConfig.json ./dist/app/

ENTRYPOINT [ "/bin/sh", "-c" , "yarn db:migrate && yarn db:seed:all && yarn start:docker" ]