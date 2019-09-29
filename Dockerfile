FROM node:10 AS builder

WORKDIR /src

COPY . /src

RUN npm ci && npm run build

RUN ls /src

FROM xmorse/nginx-for-react:latest

COPY --from=builder /src/build /var/www