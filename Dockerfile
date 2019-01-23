FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8085
WORKDIR /usr/share/nginx/html
COPY dist/hio-front .
