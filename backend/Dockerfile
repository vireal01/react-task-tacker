FROM node:14.15.1-alpine

COPY . /app
WORKDIR /app

RUN npm i

EXPOSE 5000

CMD ["npm", "run", "server"]
