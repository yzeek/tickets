FROM  node:alpine

WORKDIR /ticketing/auth

COPY package.json .
RUN npm install --only=prod
COPY  . .

CMD ["npm","start"]
