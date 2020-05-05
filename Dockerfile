FROM node:10.17.0
WORKDIR /msvc
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "src/app.js" ]