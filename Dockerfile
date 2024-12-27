FROM node:22.12.0-alpine

#setting the working directory in the container
WORKDIR /app

#copy package,json and package-lock.json to the working directory
COPY package*.json .

#installing the dependencies
RUN npm install

#copy the rest of the files to the working directory
COPY . .

#exposing the port

EXPOSE 8000

#running the app
CMD ["node","./src/server.js"]