FROM node:10.15.3 as react-build
WORKDIR /frontend
COPY . ./
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN npm i
EXPOSE 3000
CMD ["npm","start"]