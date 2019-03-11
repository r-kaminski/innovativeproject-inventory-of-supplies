FROM node:10.15.3 as react-build
WORKDIR /app
COPY . ./
RUN npm i
RUN npm run build

FROM nginx:latest
COPY --from=react-build /app/build /usr/share/nginx/html

run mkdir html
run cp -f -r /usr/share/nginx/html /
run chmod -R 755 /html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
