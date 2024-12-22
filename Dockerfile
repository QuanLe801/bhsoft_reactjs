FROM node:18-alpine

WORKDIR /bhsoft_reactjs/

COPY . .

RUN npm install --force
RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "build" ]
