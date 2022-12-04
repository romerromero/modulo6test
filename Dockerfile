FROM node:lts-alpine
RUN npm install -g http-server
RUN npm install -g json-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8086
CMD [ "http-server","json-server", "dist" ]
