FROM node:23-slim

# RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]
