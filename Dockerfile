FROM mhart/alpine-node:16.4.2

COPY . .

RUN npm ci

CMD ["npm", "run", "start:dev"]
