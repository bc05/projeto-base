FROM mhart/alpine-node:16.4.2

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]
