FROM node:10.15.3-alpine as react-build
WORKDIR /frontend
COPY . ./
RUN npm i
RUN npm install react-scripts -g --silent
EXPOSE 3000
CMD ["npm","start"]
