# Dockerfile
FROM nginx

COPY build /usr/share/nginx/html

EXPOSE 3000