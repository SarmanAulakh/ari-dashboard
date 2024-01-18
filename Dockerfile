FROM node:lts-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i --only=production
COPY . .
RUN npm run build


FROM nginx:alpine
# copy the .conf template
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page and replace it with the static files we created in the first step
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3112

CMD nginx -g 'daemon off;'