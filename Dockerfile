FROM node:14 as builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn && yarn cache clean --force
COPY . .
RUN REACT_APP_USE_LONG_POLL=1 yarn build

FROM nginx:alpine
# For compatibility with docker-gen
ENV NGINX_VERSION=
COPY nginx.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/build /usr/share/nginx/html